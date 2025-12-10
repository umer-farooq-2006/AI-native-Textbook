# ROS 2 Hands-on Example: Simple Publisher/Subscriber

import TranslationSupport from '@site/src/components/TranslationSupport';

<TranslationSupport originalText="This example demonstrates how to create a basic ROS 2 publisher and subscriber.">
This example demonstrates how to create a basic ROS 2 publisher and subscriber.
</TranslationSupport>

## Interactive Publisher/Subscriber Example

import InteractiveExample from '@site/src/components/InteractiveExample';

<InteractiveExample
  component="ROS 2"
  title="ROS 2 Publisher/Subscriber Example"
  description="Explore the fundamental concepts of ROS 2 by creating a publisher node that sends messages and a subscriber node that receives them."
  codeExample={`import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class MinimalPublisher(Node):
    def __init__(self):
        super().__init__('minimal_publisher')
        self.publisher_ = self.create_publisher(String, 'topic', 10)
        timer_period = 0.5  # seconds
        self.timer = self.create_timer(timer_period, self.timer_callback)
        self.i = 0

    def timer_callback(self):
        msg = String()
        msg.data = 'Hello World: %d' % self.i
        self.publisher_.publish(msg)
        self.get_logger().info(f'Publishing: "{msg.data}"')
        self.i += 1

def main(args=None):
    rclpy.init(args=args)
    minimal_publisher = MinimalPublisher()
    rclpy.spin(minimal_publisher)
    minimal_publisher.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
`}
/>

## How It Works

<TranslationSupport originalText="The ROS 2 publisher/subscriber pattern is a fundamental communication mechanism in ROS 2:">
The ROS 2 publisher/subscriber pattern is a fundamental communication mechanism in ROS 2:
</TranslationSupport>

- **Publisher**: Creates and sends messages to a specific topic
- **Subscriber**: Listens to messages on a specific topic
- **Topic**: Named channel through which messages flow

<TranslationSupport originalText="In this example, the publisher sends &quot;Hello World&quot; messages with an incrementing counter, and the subscriber receives and logs these messages.">
In this example, the publisher sends "Hello World" messages with an incrementing counter, and the subscriber receives and logs these messages.
</TranslationSupport>

## Key Concepts

<TranslationSupport originalText="1. **Nodes**: Independent workers in the ROS system&#10;2. **Topics**: Named buses over which nodes exchange messages&#10;3. **Publishers**: Nodes that send messages to topics&#10;4. **Subscribers**: Nodes that receive messages from topics&#10;5. **Messages**: Data packets sent between nodes">
1. **Nodes**: Independent workers in the ROS system
2. **Topics**: Named buses over which nodes exchange messages
3. **Publishers**: Nodes that send messages to topics
4. **Subscribers**: Nodes that receive messages from topics
5. **Messages**: Data packets sent between nodes
</TranslationSupport>