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
      const fetchedFeeds = await fetchPostsFromRssUrl(feedUrl);
      if (Object.keys(fetchedFeeds).length === 0) {
        setError('No results found, maybe its not a valid RSS feed url?');
      } else {
        setAnalysis(fetchedFeeds[0]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl mb-4">RSS Feed Analyzer</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="url"
          value={feedUrl}
          onChange={(e) => setFeedUrl(e.target.value)}
          placeholder="Enter RSS feed URL"
          className="border p-2 w-full mb-2 rounded"
          required
        />
        <button type="submit" className="button">
          Analyze Feed
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {analysis && (
        <div className="analysis-results border border-black rounded p-4">
          <h2 className="text-2xl mb-2 thermo">Analysis Results</h2>
          <table className="table-auto w-full">
            <tbody>
            <tr>
                <td className="border px-4 py-2 font-bold">Title</td>
                <td className="border px-4 py-2">{analysis.title}</td>
              </tr>              
              <tr>
                <td className="border px-4 py-2 font-bold">Description</td>
                <td className="border px-4 py-2">{analysis.description}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-bold">URL</td>
                <td className="border px-4 py-2">{analysis.url}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-bold">RSS</td>
                <td className="border px-4 py-2">{analysis.rss}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-bold">Number of Posts</td>
                <td className="border px-4 py-2">{Object.keys(analysis.itemDates).length}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-bold">Earliest Post</td>
                <td className="border px-4 py-2">{calculateAverageDailyPosts(analysis.itemDates).earliestDate.toString()}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-bold">Latest Post</td>
                <td className="border px-4 py-2">{calculateAverageDailyPosts(analysis.itemDates).latestDate.toString()}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-bold">Days Between</td>
                <td className="border px-4 py-2">{calculateAverageDailyPosts(analysis.itemDates).totalDays}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-bold">Posts Per Day</td>
                <td className="border px-4 py-2">{calculateAverageDailyPosts(analysis.itemDates).roundedAverage}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}