import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

import clsx from 'clsx';

import ClientTabs from '@site/src/components/ClientTabs';
import Hero from '@site/src/components/Hero';

import { CustomFields } from '@site/src/types';

import styles from './index.module.css';

const features = [
  {
    title: 'API',
    description: 'Take advantage of our API to create monitoring suites for your own websites.',
    to: '/api',
  },
  {
    title: 'CLI',
    description: 'Manage StatusCake monitoring resources without leaving the terminal.',
    to: '/guides/cli/introduction',
  },
  {
    title: 'SDKs',
    description: 'Use familiar languages to control how your StatusCake monitoring resources work for you.',
    to: '/guides/sdks/introduction',
  },
  {
    title: 'Terraform',
    description: 'Declare your StatusCake monitoring resources with tools designed to manage large infrastructures.',
    to: '/guides/terraform/introduction',
  },
  {
    title: 'Examples',
    description: 'Learn from the StatusCake team how best to enrich your monitoring capabilities.',
    to: '/guides/examples',
  },
];

export default function Home(): React.JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const { hero } = siteConfig.customFields as CustomFields;

  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <Hero
        tagline={siteConfig.tagline}
        image={hero.image}>
        <ClientTabs />
        <Link to="/guides/sdks/quickstart" className="button button--secondary button--hero button--quick">Quick Start</Link>
      </Hero>
      <main>
        <section className="hero">
          <div className="container">
            <div className={styles.cards}>
              {features.map((feature) => (
                <div className={clsx('card', styles.card)} key={feature.title}>
                  <h2>{feature.title}</h2>
                  <p>{feature.description}</p>
                  <Link to={feature.to} className="button button--primary">Learn More</Link>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="hero hero--dark">
          <div className="container">
            <div className="featured">
              <div className="featured-text">
                <h1 className="featured-title">Featured</h1>
                <h2>Introducing cakectl</h2>
                <p>The StatusCake command-line application that lets you manage your monitoring resources without leaving the terminal.</p>
                <p>Available on Windows, Linux and macOS</p>
                <Link to="/guides/cli/introduction" className="button button--primary">Learn More</Link>
              </div>
              <div className="featured-image">
                <img src="/img/index/cakectl.svg" alt="cakectl" />
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
