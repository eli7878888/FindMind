import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';
import { EMBEDDING_MODEL } from '../lib/openai';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const openaiKey = process.env.OPENAI_API_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);
const openai = new OpenAI({ apiKey: openaiKey });

const sampleTherapists = [
  {
    name: "Dr. Sarah Cohen",
    title: "Licensed Clinical Psychologist",
    bio: "Dr. Cohen specializes in treating anxiety, depression, and trauma using evidence-based approaches. With over 15 years of experience, she creates a warm, supportive environment for healing.",
    image_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    years_experience: 15,
    email: "sarah.cohen@example.com",
    phone: "(555) 123-4567",
    website: "https://sarahcohentherapy.com",
    issues: ["Anxiety", "Depression", "Trauma", "PTSD"],
    therapy_types: ["CBT", "EMDR", "Trauma-Focused Therapy"],
    gender: "Female",
    languages: ["English", "Hebrew"],
    populations_served: ["Adults", "LGBTQ+"],
    jewish_community: "Modern Orthodox",
    location: "Brooklyn, NY",
    offers_remote: true,
    insurance_accepted: ["Aetna", "Blue Cross Blue Shield", "UnitedHealthcare"],
    session_formats: ["Individual", "Couples"],
    price_range_min: 150,
    price_range_max: 250
  },
  {
    name: "Rabbi Moshe Goldstein",
    title: "Licensed Clinical Social Worker",
    bio: "Rabbi Goldstein integrates traditional Jewish wisdom with modern therapeutic approaches. He specializes in working with the Orthodox community on issues of faith, identity, and mental health.",
    image_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    years_experience: 12,
    email: "mgoldstein@example.com",
    phone: "(555) 234-5678",
    issues: ["Religious Identity", "Anxiety", "Family Conflict", "Life Transitions"],
    therapy_types: ["Psychodynamic", "Family Systems", "Integrative"],
    gender: "Male",
    languages: ["English", "Yiddish", "Hebrew"],
    populations_served: ["Adults", "Adolescents", "Jewish Community"],
    jewish_community: "Chasidish",
    location: "Lakewood, NJ",
    offers_remote: true,
    insurance_accepted: ["Medicaid", "Oscar Health"],
    session_formats: ["Individual", "Family", "Couples"],
    price_range_min: 100,
    price_range_max: 180
  },
  {
    name: "Dr. Jennifer Martinez",
    title: "Clinical Psychologist, PhD",
    bio: "Specializing in multicultural counseling and trauma recovery. Dr. Martinez provides culturally sensitive care with a focus on resilience and empowerment.",
    image_url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400",
    years_experience: 10,
    email: "jmartinez@example.com",
    phone: "(555) 345-6789",
    website: "https://drmartineztherapy.com",
    issues: ["Trauma", "Cultural Identity", "Depression", "Self-Esteem"],
    therapy_types: ["CBT", "Narrative Therapy", "Solution-Focused"],
    gender: "Female",
    languages: ["English", "Spanish"],
    populations_served: ["Adults", "Adolescents", "BIPOC"],
    location: "Manhattan, NY",
    offers_remote: true,
    insurance_accepted: ["Cigna", "Aetna", "Empire BlueCross"],
    session_formats: ["Individual"],
    price_range_min: 175,
    price_range_max: 275
  },
  {
    name: "David Levy, LMHC",
    title: "Licensed Mental Health Counselor",
    bio: "David specializes in anxiety disorders, OCD, and relationship issues. He uses a compassionate, collaborative approach to help clients achieve their goals.",
    image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    years_experience: 8,
    email: "dlevy@example.com",
    phone: "(555) 456-7890",
    issues: ["Anxiety", "OCD", "Relationship Issues", "Stress Management"],
    therapy_types: ["CBT", "ERP", "Mindfulness-Based"],
    gender: "Male",
    languages: ["English"],
    populations_served: ["Adults", "Young Adults"],
    jewish_community: "Yeshivish",
    location: "Monsey, NY",
    offers_remote: true,
    insurance_accepted: ["UnitedHealthcare", "Oxford"],
    session_formats: ["Individual", "Couples"],
    price_range_min: 120,
    price_range_max: 200
  },
  {
    name: "Dr. Rachel Weinberg",
    title: "Licensed Psychologist",
    bio: "Dr. Weinberg specializes in treating eating disorders, body image issues, and adolescent mental health. She creates a safe, non-judgmental space for growth and healing.",
    image_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    years_experience: 14,
    email: "rweinberg@example.com",
    phone: "(555) 567-8901",
    website: "https://rweinbergpsychology.com",
    issues: ["Eating Disorders", "Body Image", "Anxiety", "Depression"],
    therapy_types: ["CBT", "DBT", "ACT"],
    gender: "Female",
    languages: ["English", "Hebrew"],
    populations_served: ["Adolescents", "Young Adults", "Women"],
    location: "Teaneck, NJ",
    offers_remote: true,
    insurance_accepted: ["Aetna", "Cigna", "Horizon BCBS"],
    session_formats: ["Individual", "Group"],
    price_range_min: 160,
    price_range_max: 240
  },
  {
    name: "Michael Chen, LCSW",
    title: "Licensed Clinical Social Worker",
    bio: "Michael brings a holistic approach to therapy, integrating mindfulness and cognitive-behavioral techniques to address stress, anxiety, and life transitions.",
    image_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    years_experience: 7,
    email: "mchen@example.com",
    phone: "(555) 678-9012",
    issues: ["Stress", "Anxiety", "Work-Life Balance", "Life Transitions"],
    therapy_types: ["CBT", "Mindfulness-Based", "ACT"],
    gender: "Male",
    languages: ["English", "Mandarin"],
    populations_served: ["Adults", "Young Professionals"],
    location: "Manhattan, NY",
    offers_remote: true,
    insurance_accepted: ["Blue Cross Blue Shield", "United", "Cigna"],
    session_formats: ["Individual"],
    price_range_min: 140,
    price_range_max: 220
  },
  {
    name: "Dr. Miriam Shapiro",
    title: "Clinical Psychologist, PsyD",
    bio: "Dr. Shapiro specializes in working with children and families. She has expertise in ADHD, autism spectrum disorders, and behavioral challenges.",
    image_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
    years_experience: 11,
    email: "mshapiro@example.com",
    phone: "(555) 789-0123",
    website: "https://shapiropsychology.com",
    issues: ["ADHD", "Autism Spectrum", "Behavioral Issues", "Parenting Support"],
    therapy_types: ["Play Therapy", "Parent Training", "Behavioral Therapy"],
    gender: "Female",
    languages: ["English", "Hebrew"],
    populations_served: ["Children", "Adolescents", "Families"],
    jewish_community: "Modern Orthodox",
    location: "Queens, NY",
    offers_remote: false,
    insurance_accepted: ["Empire BlueCross", "Aetna", "UnitedHealthcare"],
    session_formats: ["Individual", "Family"],
    price_range_min: 180,
    price_range_max: 280
  },
  {
    name: "Aaron Bernstein, LMFT",
    title: "Licensed Marriage and Family Therapist",
    bio: "Aaron specializes in couples therapy and relationship counseling. He helps couples strengthen communication, resolve conflicts, and rebuild connection.",
    image_url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
    years_experience: 9,
    email: "abernstein@example.com",
    phone: "(555) 890-1234",
    issues: ["Relationship Issues", "Communication", "Premarital Counseling", "Divorce"],
    therapy_types: ["Emotionally Focused Therapy", "Gottman Method", "Imago Therapy"],
    gender: "Male",
    languages: ["English", "Hebrew"],
    populations_served: ["Couples", "Families"],
    jewish_community: "Yeshivish",
    location: "Flatbush, Brooklyn",
    offers_remote: true,
    insurance_accepted: ["UnitedHealthcare", "Aetna"],
    session_formats: ["Couples", "Family"],
    price_range_min: 160,
    price_range_max: 260
  },
  {
    name: "Dr. Lisa Thompson",
    title: "Licensed Psychologist",
    bio: "Dr. Thompson specializes in treating adults with mood disorders, including bipolar disorder and major depression. She uses a compassionate, evidence-based approach.",
    image_url: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400",
    years_experience: 18,
    email: "lthompson@example.com",
    phone: "(555) 901-2345",
    website: "https://thompsonpsychology.com",
    issues: ["Depression", "Bipolar Disorder", "Mood Disorders", "Chronic Illness"],
    therapy_types: ["CBT", "Psychodynamic", "Interpersonal Therapy"],
    gender: "Female",
    languages: ["English"],
    populations_served: ["Adults", "Older Adults"],
    location: "Manhattan, NY",
    offers_remote: true,
    insurance_accepted: ["Blue Cross Blue Shield", "Aetna", "Cigna", "Medicare"],
    session_formats: ["Individual"],
    price_range_min: 200,
    price_range_max: 300
  },
  {
    name: "Rabbi Yitzchak Klein",
    title: "Licensed Professional Counselor",
    bio: "Rabbi Klein combines Torah wisdom with modern therapeutic techniques. He specializes in helping individuals navigate faith crises, religious doubts, and spiritual growth.",
    image_url: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400",
    years_experience: 13,
    email: "yklein@example.com",
    phone: "(555) 012-3456",
    issues: ["Faith Crisis", "Religious Doubt", "Anxiety", "Identity Issues"],
    therapy_types: ["Integrative", "Existential", "Person-Centered"],
    gender: "Male",
    languages: ["English", "Yiddish", "Hebrew"],
    populations_served: ["Adults", "Adolescents", "Jewish Community"],
    jewish_community: "Chasidish",
    location: "Williamsburg, Brooklyn",
    offers_remote: true,
    insurance_accepted: ["Medicaid", "Fidelis Care"],
    session_formats: ["Individual"],
    price_range_min: 80,
    price_range_max: 150
  },
  {
    name: "Dr. Emily Rogers",
    title: "Clinical Psychologist, PhD",
    bio: "Dr. Rogers specializes in treating PTSD and trauma using evidence-based approaches including EMDR and prolonged exposure therapy.",
    image_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400",
    years_experience: 16,
    email: "erogers@example.com",
    phone: "(555) 123-4568",
    website: "https://rogerspsychology.com",
    issues: ["PTSD", "Trauma", "Sexual Assault", "Complex Trauma"],
    therapy_types: ["EMDR", "Prolonged Exposure", "Trauma-Focused CBT"],
    gender: "Female",
    languages: ["English"],
    populations_served: ["Adults", "Veterans", "Survivors"],
    location: "White Plains, NY",
    offers_remote: true,
    insurance_accepted: ["Aetna", "UnitedHealthcare", "Tricare"],
    session_formats: ["Individual"],
    price_range_min: 190,
    price_range_max: 290
  },
  {
    name: "Samuel Hoffman, LCSW",
    title: "Licensed Clinical Social Worker",
    bio: "Samuel works with adolescents and young adults facing challenges related to identity, peer relationships, and academic stress. He creates a supportive, judgment-free environment.",
    image_url: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400",
    years_experience: 6,
    email: "shoffman@example.com",
    phone: "(555) 234-5679",
    issues: ["Adolescent Issues", "Identity", "Social Anxiety", "Academic Stress"],
    therapy_types: ["CBT", "Solution-Focused", "Narrative Therapy"],
    gender: "Male",
    languages: ["English"],
    populations_served: ["Adolescents", "Young Adults"],
    location: "Riverdale, NY",
    offers_remote: true,
    insurance_accepted: ["Empire BlueCross", "Oxford"],
    session_formats: ["Individual"],
    price_range_min: 130,
    price_range_max: 210
  },
  {
    name: "Dr. Hannah Friedman",
    title: "Licensed Psychologist",
    bio: "Dr. Friedman specializes in perinatal mental health, helping women navigate pregnancy, postpartum depression, and motherhood transitions.",
    image_url: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400",
    years_experience: 10,
    email: "hfriedman@example.com",
    phone: "(555) 345-6780",
    website: "https://friedmanpsychology.com",
    issues: ["Postpartum Depression", "Perinatal Anxiety", "Pregnancy Loss", "Motherhood"],
    therapy_types: ["CBT", "Interpersonal Therapy", "Supportive Therapy"],
    gender: "Female",
    languages: ["English", "Hebrew"],
    populations_served: ["Women", "New Mothers"],
    jewish_community: "Modern Orthodox",
    location: "Teaneck, NJ",
    offers_remote: true,
    insurance_accepted: ["Horizon BCBS", "Aetna", "United"],
    session_formats: ["Individual", "Group"],
    price_range_min: 170,
    price_range_max: 250
  },
  {
    name: "Dr. James Wilson",
    title: "Licensed Psychologist",
    bio: "Dr. Wilson specializes in treating substance abuse and addiction. He uses a compassionate, non-judgmental approach to help clients achieve and maintain recovery.",
    image_url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400",
    years_experience: 20,
    email: "jwilson@example.com",
    phone: "(555) 456-7891",
    website: "https://wilsonrecovery.com",
    issues: ["Substance Abuse", "Addiction", "Dual Diagnosis", "Recovery"],
    therapy_types: ["Motivational Interviewing", "CBT", "12-Step Facilitation"],
    gender: "Male",
    languages: ["English"],
    populations_served: ["Adults", "Young Adults"],
    location: "Manhattan, NY",
    offers_remote: false,
    insurance_accepted: ["Cigna", "Aetna", "Blue Cross Blue Shield", "UnitedHealthcare"],
    session_formats: ["Individual", "Group"],
    price_range_min: 180,
    price_range_max: 280
  },
  {
    name: "Chaya Schwartz, LMHC",
    title: "Licensed Mental Health Counselor",
    bio: "Chaya specializes in working with women in the Orthodox community, addressing challenges related to marriage, family, and religious observance.",
    image_url: "https://images.unsplash.com/photo-1542156822-6924d1a71ace?w=400",
    years_experience: 8,
    email: "cschwartz@example.com",
    phone: "(555) 567-8902",
    issues: ["Marriage Issues", "Family Conflict", "Anxiety", "Depression"],
    therapy_types: ["CBT", "Emotion-Focused Therapy", "Integrative"],
    gender: "Female",
    languages: ["English", "Yiddish", "Hebrew"],
    populations_served: ["Women", "Jewish Community"],
    jewish_community: "Yeshivish",
    location: "Monsey, NY",
    offers_remote: true,
    insurance_accepted: ["UnitedHealthcare", "Oscar Health", "Medicaid"],
    session_formats: ["Individual", "Couples"],
    price_range_min: 110,
    price_range_max: 190
  },
  {
    name: "Dr. Robert Kaplan",
    title: "Clinical Psychologist, PhD",
    bio: "Dr. Kaplan specializes in treating chronic pain and health psychology. He helps clients manage the psychological impact of chronic illness and pain.",
    image_url: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400",
    years_experience: 17,
    email: "rkaplan@example.com",
    phone: "(555) 678-9013",
    website: "https://kaplanpsychology.com",
    issues: ["Chronic Pain", "Chronic Illness", "Health Anxiety", "Stress Management"],
    therapy_types: ["CBT", "Acceptance and Commitment Therapy", "Biofeedback"],
    gender: "Male",
    languages: ["English"],
    populations_served: ["Adults", "Older Adults"],
    location: "White Plains, NY",
    offers_remote: true,
    insurance_accepted: ["Medicare", "Blue Cross Blue Shield", "Aetna"],
    session_formats: ["Individual"],
    price_range_min: 185,
    price_range_max: 275
  },
  {
    name: "Tamar Goldman, LCSW",
    title: "Licensed Clinical Social Worker",
    bio: "Tamar specializes in working with LGBTQ+ individuals and provides affirming therapy for issues related to identity, coming out, and family acceptance.",
    image_url: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400",
    years_experience: 9,
    email: "tgoldman@example.com",
    phone: "(555) 789-0124",
    issues: ["LGBTQ+ Issues", "Identity", "Family Conflict", "Anxiety"],
    therapy_types: ["Affirming Therapy", "CBT", "Narrative Therapy"],
    gender: "Female",
    languages: ["English", "Hebrew"],
    populations_served: ["LGBTQ+", "Young Adults"],
    jewish_community: "Modern Orthodox",
    location: "Manhattan, NY",
    offers_remote: true,
    insurance_accepted: ["Empire BlueCross", "Aetna", "Cigna"],
    session_formats: ["Individual", "Group"],
    price_range_min: 150,
    price_range_max: 230
  },
  {
    name: "Dr. Benjamin Rubin",
    title: "Licensed Psychologist",
    bio: "Dr. Rubin specializes in neuropsychological assessment and working with individuals with learning disabilities and cognitive challenges.",
    image_url: "https://images.unsplash.com/photo-1504593811423-6dd665756598?w=400",
    years_experience: 12,
    email: "brubin@example.com",
    phone: "(555) 890-1235",
    website: "https://rubinneuropsych.com",
    issues: ["Learning Disabilities", "ADHD", "Memory Issues", "Cognitive Assessment"],
    therapy_types: ["Neuropsychological Testing", "CBT", "Psychoeducation"],
    gender: "Male",
    languages: ["English", "Hebrew"],
    populations_served: ["Children", "Adolescents", "Adults"],
    location: "Brooklyn, NY",
    offers_remote: false,
    insurance_accepted: ["Blue Cross Blue Shield", "UnitedHealthcare", "Cigna"],
    session_formats: ["Individual"],
    price_range_min: 200,
    price_range_max: 350
  },
  {
    name: "Rivka Stein, LMFT",
    title: "Licensed Marriage and Family Therapist",
    bio: "Rivka works with families facing challenges such as parenting conflicts, blended family issues, and intergenerational trauma.",
    image_url: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400",
    years_experience: 11,
    email: "rstein@example.com",
    phone: "(555) 901-2346",
    issues: ["Parenting Issues", "Blended Families", "Family Conflict", "Trauma"],
    therapy_types: ["Family Systems Therapy", "Structural Therapy", "Narrative Therapy"],
    gender: "Female",
    languages: ["English", "Yiddish", "Hebrew"],
    populations_served: ["Families", "Children", "Adolescents"],
    jewish_community: "Chasidish",
    location: "Boro Park, Brooklyn",
    offers_remote: true,
    insurance_accepted: ["Medicaid", "Fidelis Care", "UnitedHealthcare"],
    session_formats: ["Family", "Couples"],
    price_range_min: 120,
    price_range_max: 200
  },
  {
    name: "Dr. Amanda Foster",
    title: "Clinical Psychologist, PsyD",
    bio: "Dr. Foster specializes in treating anxiety disorders using exposure therapy and cognitive-behavioral techniques. She helps clients overcome phobias and panic attacks.",
    image_url: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400",
    years_experience: 9,
    email: "afoster@example.com",
    phone: "(555) 012-3457",
    website: "https://fosterpsychology.com",
    issues: ["Anxiety Disorders", "Panic Attacks", "Phobias", "Social Anxiety"],
    therapy_types: ["Exposure Therapy", "CBT", "ACT"],
    gender: "Female",
    languages: ["English"],
    populations_served: ["Adults", "Young Adults"],
    location: "Manhattan, NY",
    offers_remote: true,
    insurance_accepted: ["Aetna", "Cigna", "Oxford"],
    session_formats: ["Individual"],
    price_range_min: 175,
    price_range_max: 265
  },
  {
    name: "Eli Wasserman, LCSW",
    title: "Licensed Clinical Social Worker",
    bio: "Eli specializes in helping men navigate career transitions, work stress, and midlife challenges. He provides practical, goal-oriented therapy.",
    image_url: "https://images.unsplash.com/photo-1512485694743-9c9538b4e6e0?w=400",
    years_experience: 7,
    email: "ewasserman@example.com",
    phone: "(555) 123-4569",
    issues: ["Work Stress", "Career Transitions", "Midlife Crisis", "Anxiety"],
    therapy_types: ["Solution-Focused", "CBT", "Existential Therapy"],
    gender: "Male",
    languages: ["English", "Hebrew"],
    populations_served: ["Men", "Adults"],
    jewish_community: "Modern Orthodox",
    location: "Queens, NY",
    offers_remote: true,
    insurance_accepted: ["Empire BlueCross", "Aetna", "United"],
    session_formats: ["Individual"],
    price_range_min: 140,
    price_range_max: 220
  }
];

async function generateEmbedding(text: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: EMBEDDING_MODEL, // text-embedding-ada-002
    input: text,
  });
  return response.data[0].embedding;
}

async function seedDatabase() {
  console.log('Starting to seed database...');
  
  for (const therapist of sampleTherapists) {
    console.log(`Processing ${therapist.name}...`);
    
    // Create text representation for embedding
    const embeddingText = `
      ${therapist.bio}
      Specializations: ${therapist.issues.join(', ')}
      Therapy Types: ${therapist.therapy_types.join(', ')}
      Populations: ${therapist.populations_served.join(', ')}
      ${therapist.jewish_community ? `Community: ${therapist.jewish_community}` : ''}
    `.trim();
    
    // Generate embedding
    const embedding = await generateEmbedding(embeddingText);
    
    // Insert into database
    const { data, error } = await supabase
      .from('therapists')
      .insert({
        ...therapist,
        specialization_embedding: embedding,
      });
    
    if (error) {
      console.error(`Error inserting ${therapist.name}:`, error);
    } else {
      console.log(`✓ Added ${therapist.name}`);
    }
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log('Database seeding complete!');
}

seedDatabase().catch(console.error);

