import Layout from '../components/Layout';
import APIReference from '../components/APIReference';
import React from 'react';

export default function APIReferencePage() {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <APIReference />
        </div>
      </div>
    </Layout>
  );
} 