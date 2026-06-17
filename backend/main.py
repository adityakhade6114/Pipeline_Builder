from collections import defaultdict, deque
from typing import Any

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PipelinePayload(BaseModel):
    nodes: list[Any]
    edges: list[Any]


def check_dag(nodes: list, edges: list) -> bool:
    if not nodes:
        return True

    ids = {node.get("id") for node in nodes if node.get("id") is not None}
    if not ids:
        return True

    graph = defaultdict(list)
    indegree = {node_id: 0 for node_id in ids}

    for edge in edges:
        src = edge.get("source")
        tgt = edge.get("target")
        if src not in ids or tgt not in ids:
            continue
        graph[src].append(tgt)
        indegree[tgt] += 1

    queue = deque([node_id for node_id in ids if indegree[node_id] == 0])
    seen = 0

    while queue:
        current = queue.popleft()
        seen += 1
        for nxt in graph[current]:
            indegree[nxt] -= 1
            if indegree[nxt] == 0:
                queue.append(nxt)

    return seen == len(ids)


@app.get("/")
def read_root():
    return {"Ping": "Pong"}


@app.post("/pipelines/parse")
def parse_pipeline(payload: PipelinePayload):
    node_count = len(payload.nodes)
    edge_count = len(payload.edges)
    is_dag = check_dag(payload.nodes, payload.edges)

    return {
        "num_nodes": node_count,
        "num_edges": edge_count,
        "is_dag": is_dag,
    }
