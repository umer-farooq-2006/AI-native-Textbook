# VLA + GPT Hands-on Example: Task Planning with LLMs

import InteractiveExample from '@site/src/components/InteractiveExample';

<InteractiveExample
  component="VLA + GPT"
  title="Task Planning with Vision-Language-Action and LLMs"
  description="Explore how Vision-Language-Action models can work with Large Language Models for high-level task planning in robotics."
  codeExample={`# VLA + GPT Task Planning (Conceptual Flow):

# 1. Perception (Vision)
# Robot observes its environment and identifies objects and their states.

# 2. Language Understanding (LLM)
# User gives high-level command (e.g., "Bring me the red cup").
# LLM interprets command and breaks it down into sub-tasks.

# 3. Action Planning (LLM/VLA)
# LLM generates sequence of low-level actions:
# - navigate_to(table)
# - detect_object(red_cup)
# - grasp_object(red_cup)
# - navigate_to(user)
# - release_object(red_cup)

# 4. Execution (Robot)
# Robot executes actions with real-time visual feedback.

# Example Python code for VLA + GPT integration:
import openai
import numpy as np
from typing import List, Dict

class VLATaskPlanner:
    def __init__(self, openai_api_key: str):
        openai.api_key = openai_api_key
        self.task_history = []

    def plan_task(self, user_command: str, environment_state: Dict) -> List[str]:
        """
        Plan a sequence of actions based on user command and environment state.
        """
        prompt = f'''
        Given the user command: "{user_command}"
        And the environment state: {environment_state}

        Generate a sequence of robot actions to accomplish the task.
        Return a list of actions in the format: ["action1", "action2", ...]
        Valid actions: navigate_to, detect_object, grasp_object, release_object, etc.
        '''

        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}]
        )

        # In a real implementation, parse the response into actionable commands
        return ["navigate_to(table)", "detect_object(red_cup)", "grasp_object(red_cup)", "navigate_to(user)", "release_object(red_cup)"]

    def execute_task(self, user_command: str, environment_state: Dict):
        """
        Execute the planned task sequence.
        """
        actions = self.plan_task(user_command, environment_state)
        self.task_history.append({
            "command": user_command,
            "actions": actions,
            "environment": environment_state
        })

        print(f"Executing task: {user_command}")
        for action in actions:
            print(f"Performing: {action}")
            # In a real implementation, this would interface with the robot/VLA model

# Example usage
def main():
    planner = VLATaskPlanner("your-openai-api-key")
    env_state = {
        "objects": ["red_cup", "blue_bottle", "green_box"],
        "robot_position": "home",
        "user_position": "living_room"
    }

    result = planner.execute_task("Bring me the red cup", env_state)
    print("Task completed!")

if __name__ == "__main__":
    main()
`}
/>

## How It Works

Vision-Language-Action (VLA) models combined with LLMs create powerful robotic systems:

- **Vision**: Understanding the environment through cameras and sensors
- **Language**: Processing high-level human commands and generating action plans
- **Action**: Executing physical tasks with precise motor control
- **Integration**: LLMs bridge high-level planning with low-level execution

## Key Concepts

1. **Multimodal Perception**: Combining visual and language understanding
2. **Task Decomposition**: Breaking high-level commands into executable steps
3. **Real-time Adaptation**: Adjusting plans based on environmental changes
4. **Human-Robot Interaction**: Natural language interfaces for robot control
5. **Embodied AI**: Physical agents that understand and act in the world