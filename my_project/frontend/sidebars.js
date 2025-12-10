/**
 * Creating a sidebar enables you to:
 - Create an ordered group of docs
 - Render a sidebar in the docs side of your site

- Learn more about how to use the sidebar item types in docs: https://docusaurus.io/docs/sidebar#sidebar-item-types
 */

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'ROS 2',
      items: ['ros2/intro', 'ros2/example', 'ros2/quiz'],
    },
    {
      type: 'category',
      label: 'Gazebo & Unity',
      items: ['gazebo-unity/intro', 'gazebo-unity/example', 'gazebo-unity/quiz'],
    },
    {
      type: 'category',
      label: 'NVIDIA Isaac',
      items: ['nvidia-isaac/intro', 'nvidia-isaac/example', 'nvidia-isaac/quiz'],
    },
    {
      type: 'category',
      label: 'VLA + GPT',
      items: ['vla-gpt/intro', 'vla-gpt/example', 'vla-gpt/quiz'],
    },
  ],
};

module.exports = sidebars;
