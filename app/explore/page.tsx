'use client';

import { useState, useEffect } from 'react';
import { Therapist } from '@/types/therapist';

const ISSUES = ['Anxiety', 'Depression', 'Trauma', 'PTSD', 'OCD', 'ADHD', 'Eating Disorders', 'Relationship Issues', 'Grief'];
const THERAPY_TYPES = ['CBT', 'DBT', 'EMDR', 'Psychodynamic', 'ACT', 'Family Systems'];
const SESSION_FORMATS = ['Individual', 'Couples', 'Family', 'Group'];
const JEWISH_COMMUNITIES = ['Chasidish', 'Yeshivish', 'Modern Orthodox'];
const GENDERS = ['Male', 'Female'];

export default function ExplorePage() {
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  // Filter states
  const [search, setSearch] = useState('');
  const [selectedIssue, setSelectedIssue] = useState('');
  const [selectedTherapyType, setSelectedTherapyType] = useState('');
  const [selectedSessionFormat, setSelectedSessionFormat] = useState('');
  const [selectedJewishCommunity, setSelectedJewishCommunity] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [location, setLocation] = useState('');

  useEffect(() => {
    fetchTherapists();
  }, [search, selectedIssue, selectedTherapyType, selectedSessionFormat, selectedJewishCommunity, selectedGender, remoteOnly, location]);

  const fetchTherapists = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (selectedIssue) params.append('issue', selectedIssue);
      if (selectedTherapyType) params.append('therapy_type', selectedTherapyType);
      if (selectedSessionFormat) params.append('session_format', selectedSessionFormat);
      if (selectedJewishCommunity) params.append('jewish_community', selectedJewishCommunity);
      if (selectedGender) params.append('gender', selectedGender);
      if (remoteOnly) params.append('remote', 'true');
      if (location) params.append('location', location);

      const response = await fetch(`/api/therapists?${params}`);
      if (!response.ok) throw new Error('Failed to fetch therapists');

      const data = await response.json();
      setTherapists(data);
    } catch (error) {
      console.error('Error fetching therapists:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setSearch('');
    setSelectedIssue('');
    setSelectedTherapyType('');
    setSelectedSessionFormat('');
    setSelectedJewishCommunity('');
    setSelectedGender('');
    setRemoteOnly(false);
    setLocation('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Explore Therapists</h1>
          <p className="text-gray-600">Browse and filter to find the right therapist for you</p>
        </div>

        {/* Search and Filter Toggle */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search by name or specialization..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
            >
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="City or area"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Issue/Concern
                </label>
                <select
                  value={selectedIssue}
                  onChange={(e) => setSelectedIssue(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Issues</option>
                  {ISSUES.map((issue) => (
                    <option key={issue} value={issue}>
                      {issue}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Therapy Type
                </label>
                <select
                  value={selectedTherapyType}
                  onChange={(e) => setSelectedTherapyType(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Types</option>
                  {THERAPY_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Session Format
                </label>
                <select
                  value={selectedSessionFormat}
                  onChange={(e) => setSelectedSessionFormat(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Formats</option>
                  {SESSION_FORMATS.map((format) => (
                    <option key={format} value={format}>
                      {format}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Jewish Community
                </label>
                <select
                  value={selectedJewishCommunity}
                  onChange={(e) => setSelectedJewishCommunity(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Communities</option>
                  {JEWISH_COMMUNITIES.map((community) => (
                    <option key={community} value={community}>
                      {community}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender
                </label>
                <select
                  value={selectedGender}
                  onChange={(e) => setSelectedGender(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Any Gender</option>
                  {GENDERS.map((gender) => (
                    <option key={gender} value={gender}>
                      {gender}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={remoteOnly}
                    onChange={(e) => setRemoteOnly(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Remote/Online Only</span>
                </label>
              </div>

              <div className="flex items-end">
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-700 underline"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : therapists.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600">No therapists found. Try adjusting your filters.</p>
          </div>
        ) : (
          <>
            <p className="text-gray-600 mb-4">
              Found {therapists.length} therapist{therapists.length !== 1 ? 's' : ''}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {therapists.map((therapist) => (
                <a
                  key={therapist.id}
                  href={`/therapist/${therapist.id}`}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden"
                >
                  <div className="h-48 bg-gray-200 overflow-hidden">
                    <img
                      src={therapist.image_url || '/placeholder.jpg'}
                      alt={therapist.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {therapist.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">{therapist.title}</p>
                    <p className="text-xs text-gray-500 mb-3 line-clamp-2">{therapist.bio}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {therapist.issues.slice(0, 3).map((issue, idx) => (
                        <span
                          key={idx}
                          className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded"
                        >
                          {issue}
                        </span>
                      ))}
                    </div>
                    <div className="text-xs text-gray-500">
                      <p>📍 {therapist.location}</p>
                      {therapist.offers_remote && <p>💻 Offers Remote Sessions</p>}
                      <p>💰 ${therapist.price_range_min}-${therapist.price_range_max}/session</p>
                      {therapist.jewish_community && <p>🕎 {therapist.jewish_community}</p>}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

