import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

import Card from '@site/src/components/Card';
import Cards from '@site/src/components/Cards';
import Hero from '@site/src/components/Hero';
import Image from '@site/src/components/Image';
import Tabs from '@site/src/components/Tabs';

import { CustomFields } from '@site/src/types';

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const { hero, clients } = siteConfig.customFields as CustomFields;

  const tiggerEvent = (idx: number): void => {
    if (typeof window.ga === 'function') {
      window.ga('send', {
        hitType: 'event',
        eventCategory: 'developers',
        eventAction: 'selected',
        eventLabel: 'client',
        eventValue: clients[idx].title,
      });
    }
  }

  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <Hero
          tagline={siteConfig.tagline}
          image={hero.image}>
        <Tabs onSelected={tiggerEvent} tabs={clients} />
        <Link to="/guides/sdks/installation" className="button button--secondary button--hero button--quick">Quick Start</Link>
      </Hero>
      <main>
        <section className="hero">
          <div className="container">
            <Cards>
              <Card title="API">
                <p>Take advantage of our API to create monitoring suites for you own websites.</p>
                <Link to="/api" className="button button--primary">Learn More</Link>
              </Card>
              <Card title="CLI">
                <p>Manage StatusCake monitoring resources without leaving the terminal.</p>
                <button className="button button--primary">Coming Soon</button>
              </Card>
              <Card title="SDKs">
                <p>Use familiar languages to control how your StatusCake monitoring resources work for you.</p>
                <Link to="/guides/sdks/introduction" className="button button--primary">Learn More</Link>
              </Card>
              <Card title="Terraform">
                <p>Declare your StatusCake monitoring resources with tools designed to manage large infrastructures.</p>
                <Link to="/guides/terraform/introduction" className="button button--primary">Learn More</Link>
              </Card>
              <Card title="Examples">
                <p>Learn from the StatusCake team how best to enrich you monitoring capabilities.</p>
                <Link to="/guides/examples" className="button button--primary">Learn More</Link>
              </Card>
              <Card title="Community">
                <p>Use open source projects developed by our ever growing community.</p>
                <Link to="/guides/examples#community" className="button button--primary">Learn More</Link>
              </Card>
            </Cards>
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
                <button className="button button--primary">Coming Soon</button>
              </div>
              <div className="featured-image">
                <Image src="/img/index/cakectl.svg" alt="cakectl" />
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
