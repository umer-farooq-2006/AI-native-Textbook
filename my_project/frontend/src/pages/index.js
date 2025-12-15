import React, { useRef, useEffect } from 'react';
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
            className={clsx('button', styles.ctaButton)}
            to="/docs/intro">
            Start Learning - 5min ⏱️
          </Link>
        </div>
      </div>
    </header>
  );
}

function FeatureSection({ chatbotRef }) {
  const handleAIAssistantClick = () => {
    if (chatbotRef && chatbotRef.current) {
      chatbotRef.current.openChatbot();
    }
  };

  const handleInteractiveLearningClick = () => {
    // Navigate to the textbook experience (same as the CTA button)
    window.location.href = '/docs/intro';
  };

  return (
    <section className={styles.features}>
      <div className="container">
        <div className="text--center">
          <h2 className={styles.sectionTitle}>
            Learn Physical AI & Humanoid Robotics
          </h2>
          <p className={styles.sectionSubtitle}>
            Explore cutting-edge concepts in robotics, AI, and autonomous systems
          </p>
        </div>

        <div className="row" style={{ alignItems: 'stretch', justifyContent: 'center', gap: '2rem' }}>
          <div className="col col--4">
            <div
              className={styles.featureCard}
              onClick={handleInteractiveLearningClick}
              style={{ cursor: 'pointer' }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleInteractiveLearningClick();
                }
              }}
            >
              <div className={styles.featureIcon}>
                🤖
              </div>
              <h3 className={styles.featureTitle}>
                Interactive Learning
              </h3>
              <p className={styles.featureDescription}>
                Engage with hands-on examples for ROS 2, Gazebo & Unity, NVIDIA Isaac, and VLA+GPT.
              </p>
            </div>
          </div>

          <div className="col col--4">
            <div
              className={styles.featureCard}
              onClick={handleAIAssistantClick}
              style={{ cursor: 'pointer' }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleAIAssistantClick();
                }
              }}
            >
              <div className={styles.featureIcon}>
                💡
              </div>
              <h3 className={styles.featureTitle}>
                AI Assistant
              </h3>
              <p className={styles.featureDescription}>
                Get answers to your questions about Physical AI & Humanoid Robotics.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  const chatbotRef = useRef();

  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <FeatureSection chatbotRef={chatbotRef} />
      </main>
      <FloatingChatbot ref={chatbotRef} />
    </Layout>
  );
}
