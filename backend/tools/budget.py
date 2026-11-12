from fastapi import APIRouter

router = APIRouter()

def calculate_budget(
    total_budget: float,
    transport: float,
    hotel: float,
    food: float,
    activities: float
):
    total = transport + hotel + food + activities

    remaining = total_budget - total

    return {
        "budget": total_budget,
        "estimated_cost": total,
        "remaining": remaining,
        "within_budget": remaining >= 0
    }