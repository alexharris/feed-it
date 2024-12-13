'use client'

import { useState } from 'react';
import Parser from 'rss-parser';
import { fetchPostsFromRssUrl } from '../components/fetchPostsFromRssUrl';
import { calculateAverageDailyPosts } from '@/utils/tools';

export default function AnalyzerPage() {
  const [feedUrl, setFeedUrl] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const parser = new Parser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const fetchedFeeds = await fetchPostsFromRssUrl(feedUrl)

      setAnalysis(fetchedFeeds[0]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4">RSS Feed Analyzer</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="url"
          value={feedUrl}
          onChange={(e) => setFeedUrl(e.target.value)}
          placeholder="Enter RSS feed URL"
          className="border p-2 w-full mb-2"
          required
        />
        <button type="submit" className="button">
          Analyze Feed
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {analysis && (
        <div className="analysis-results">
          <h2 className="text-2xl mb-2">Analysis Results</h2>
          {analysis.title} <br />
          {analysis.description} <br />
          {analysis.url} <br />
          {analysis.rss} <br />
          
            <ul>
            {Object.keys(analysis.itemDates).map((date, index) => (
              <li key={index}>{analysis.itemDates[index]}</li>
            ))}
            </ul>
            {console.log(analysis.itemDates)}
            <hr />
            Number of dates: {Object.keys(analysis.itemDates).length}
            <hr />
            Earliest Date: {calculateAverageDailyPosts(analysis.itemDates).earliestDate.toString()}
            <hr />
            Latest Date: {calculateAverageDailyPosts(analysis.itemDates).latestDate.toString()}
            <hr />
            Total Days: {calculateAverageDailyPosts(analysis.itemDates).totalDays}            
            <hr />
            Daily: {calculateAverageDailyPosts(analysis.itemDates).roundedAverage}
          
          {/* <p>Total Posts: {analysis.totalPosts}</p>
          <p>Post Frequency: {analysis.postFrequency}</p>
          <p>Average Posts per Day: {analysis.averagePostsPerDay}</p> */}
        </div>
      )}
    </div>
  );
}