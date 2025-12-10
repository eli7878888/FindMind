import { supabase } from '@/lib/supabase';
import { Therapist } from '@/types/therapist';
import { notFound } from 'next/navigation';

export default async function TherapistDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { data: therapist, error } = await supabase
    .from('therapists')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !therapist) {
    notFound();
  }

  const typedTherapist = therapist as Therapist;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <a
            href="/explore"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
          >
            ← Back to Explore
          </a>

          {/* Header Card */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
            <div className="md:flex">
              <div className="md:w-1/3">
                <img
                  src={typedTherapist.image_url || '/placeholder.jpg'}
                  alt={typedTherapist.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-2/3 p-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {typedTherapist.name}
                </h1>
                <p className="text-lg text-gray-600 mb-4">{typedTherapist.title}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                  <div>
                    <span className="font-semibold">Experience:</span>{' '}
                    {typedTherapist.years_experience} years
                  </div>
                  <div>
                    <span className="font-semibold">Gender:</span> {typedTherapist.gender}
                  </div>
                  {typedTherapist.jewish_community && (
                    <div>
                      <span className="font-semibold">Community:</span>{' '}
                      {typedTherapist.jewish_community}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl font-bold text-blue-600">
                    ${typedTherapist.price_range_min}-${typedTherapist.price_range_max}
                  </span>
                  <span className="text-gray-500">per session</span>
                </div>
                <a
                  href={`mailto:${typedTherapist.email}`}
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition"
                >
                  Contact Therapist
                </a>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
            <p className="text-gray-700 leading-relaxed">{typedTherapist.bio}</p>
          </div>

          {/* Specializations */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Specializations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Issues & Concerns</h3>
                <div className="flex flex-wrap gap-2">
                  {typedTherapist.issues.map((issue, idx) => (
                    <span
                      key={idx}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {issue}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Therapy Types</h3>
                <div className="flex flex-wrap gap-2">
                  {typedTherapist.therapy_types.map((type, idx) => (
                    <span
                      key={idx}
                      className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Populations Served */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Populations Served
            </h2>
            <div className="flex flex-wrap gap-2">
              {typedTherapist.populations_served.map((pop, idx) => (
                <span
                  key={idx}
                  className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
                >
                  {pop}
                </span>
              ))}
            </div>
          </div>

          {/* Session Details */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Session Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Session Formats</h3>
                <ul className="list-disc list-inside text-gray-700">
                  {typedTherapist.session_formats.map((format, idx) => (
                    <li key={idx}>{format}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Availability</h3>
                <div className="text-gray-700">
                  <p>📍 {typedTherapist.location}</p>
                  {typedTherapist.offers_remote && (
                    <p className="text-green-600 font-semibold mt-1">
                      ✓ Offers Remote/Online Sessions
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Languages */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Languages</h2>
            <div className="flex flex-wrap gap-2">
              {typedTherapist.languages.map((lang, idx) => (
                <span
                  key={idx}
                  className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>

          {/* Insurance */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Insurance Accepted
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {typedTherapist.insurance_accepted.map((insurance, idx) => (
                <div key={idx} className="flex items-center">
                  <span className="text-green-600 mr-2">✓</span>
                  <span className="text-gray-700">{insurance}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Contact Information
            </h2>
            <div className="space-y-2 text-gray-700">
              <p>
                <span className="font-semibold">Email:</span>{' '}
                <a
                  href={`mailto:${typedTherapist.email}`}
                  className="text-blue-600 hover:underline"
                >
                  {typedTherapist.email}
                </a>
              </p>
              {typedTherapist.phone && (
                <p>
                  <span className="font-semibold">Phone:</span>{' '}
                  <a
                    href={`tel:${typedTherapist.phone}`}
                    className="text-blue-600 hover:underline"
                  >
                    {typedTherapist.phone}
                  </a>
                </p>
              )}
              {typedTherapist.website && (
                <p>
                  <span className="font-semibold">Website:</span>{' '}
                  <a
                    href={typedTherapist.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {typedTherapist.website}
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

