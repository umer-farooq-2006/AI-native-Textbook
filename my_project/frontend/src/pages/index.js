import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
// import RAGChatbotUI from '@site/src/components/RAGChatbotUI';
// import InteractiveExample from '@site/src/components/InteractiveExample';
// import SafeAuthComponent from '@site/src/components/SafeAuthComponent';
// import SafePersonalizationSettings from '@site/src/components/SafePersonalizationSettings';
import FloatingChatbot from '@site/src/components/FloatingChatbot';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Start Learning - 5min ⏱️
          </Link>
        </div>
      </div>
    </header>
  );
}

function FeatureSection() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          <div className="col col--4">
            <div className="text--center padding-horiz--md">
              {/* <h2>Interactive Learning</h2>
              <p>Engage with hands-on examples for ROS 2, Gazebo & Unity, NVIDIA Isaac, and VLA+GPT.</p> */}
              {/* <InteractiveExample
                component="ROS 2"
                title="Try it yourself!"
                description="Interactive example of publisher/subscriber pattern in ROS 2"
              /> */}
            </div>
          </div>
          <div className="col col--4">
            <div className="text--center padding-horiz--md">
            </div>
          </div>
          <div className="col col--4">
            <div className="text--center padding-horiz--md">
              {/* <h2>Personalized Experience</h2>
              <p>Customize your learning experience with personalization and translation features.</p> */}
              {/* <SafeAuthComponent />
              <SafePersonalizationSettings /> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <FeatureSection />
      </main>
      <FloatingChatbot />
    </Layout>
  );
}
