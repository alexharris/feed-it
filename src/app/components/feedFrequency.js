'use client'

import React from 'react';

function calculateFrequency(posts) {
  console.log(posts);
  if (!posts || posts.length === 0) return { monthly: 0 };

  const now = new Date();
  const oneMonth = 30 * 24 * 60 * 60 * 1000;

  const lastMonthPosts = Object.values(posts).filter(post => (now - new Date(post)) <= oneMonth).length;

  return {
    monthly: lastMonthPosts
  };
}

function FeedFrequency({ feeds }) {
  const frequencies = Object.values(feeds).map(feed => {
    const frequency = calculateFrequency(feed.itemDates);
    return {
      title: feed.title,
      monthly: frequency.monthly.toFixed(2)
    };
  });

  const totalMonthly = frequencies.reduce((total, feed) => total + parseFloat(feed.monthly), 0);
  // const averageMonthly = (frequencies.length > 0) ? (totalMonthly / frequencies.length).toFixed(2) : 0;

  return (
    <div>
      <p>In the past month, this list has had {totalMonthly} posts.</p>

    </div>
  );
}

export default FeedFrequency;