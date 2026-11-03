export interface UserAccount {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string; // default password
  role: 'admin' | 'agency' | 'customer';
  isCertifiedAgent?: boolean;
  licenseNumber?: string;
  designation?: string;
  agencyId?: string;
  companyName?: string;
  avatar: string;
  phone?: string;
  whatsapp?: string;
  verified?: boolean;
  address?: string;
  bio?: string;
  memberSince?: string;
  permissions?: string[];
  notificationPreferences?: {
    email: boolean;
    whatsapp: boolean;
    leads: boolean;
    tourAlerts: boolean;
  };
}

export const initialUserAccounts: UserAccount[] = [
  {
    id: 'user-admin-1',
    name: 'Super Administrator',
    username: 'admin',
    email: 'admin@ri8click.com',
    password: 'admin123',
    role: 'admin',
    designation: 'Principal System Administrator & Consortium Controller',
    companyName: 'ri8click Corporate Consortium',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    phone: '+92 336 5666727',
    whatsapp: '+92 336 5666727',
    verified: true,
    licenseNumber: 'RDA-CONSORTIUM-ADM-001',
    memberSince: 'January 2024',
    address: 'Corporate HQ, Blue Area & Faisal Hills Executive Block, Taxila',
    bio: 'Chief System Administrator & Consortium Governance Controller. Holds global unconstrained access across all brokerages, megaprojects, and listings.',
    permissions: [
      'all',
      'manage_all_posts',
      'manage_agencies',
      'manage_users',
      'manage_advibe',
      'manage_banners',
      'manage_blogs',
      'manage_portions',
      'manage_locations',
      'system_settings'
    ],
    notificationPreferences: {
      email: true,
      whatsapp: true,
      leads: true,
      tourAlerts: true
    }
  },
  {
    id: 'user-agency-zem',
    name: 'Zishan Adil',
    username: 'zem',
    email: 'zem@ri8click.com',
    password: 'zem123',
    role: 'agency',
    isCertifiedAgent: true,
    designation: 'Chief Executive & Senior Certified Broker',
    agencyId: 'agency-1',
    companyName: 'Al-Mairaj Real Estate Group / ZEM Builders',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    phone: '+92 333 5551234',
    whatsapp: '+92 333 5551234',
    verified: true,
    licenseNumber: 'RDA-TAX-AG-2024-889',
    memberSince: 'March 2024',
    address: 'Office #10, Main Boulevard Commercial, Faisal Hills, Taxila',
    bio: 'Premier certified agency specializing in residential villas and commercial plots in Taxila & Faisal Hills.',
    permissions: [
      'create_listings',
      'edit_own_listings',
      'delete_own_listings',
      'manage_own_advibe',
      'view_assigned_leads',
      'schedule_tours'
    ],
    notificationPreferences: {
      email: true,
      whatsapp: true,
      leads: true,
      tourAlerts: true
    }
  },
  {
    id: 'user-agency-alsadat',
    name: 'Syed Sadat Ali',
    username: 'alsadat',
    email: 'alsadat@ri8click.com',
    password: 'alsadat123',
    role: 'agency',
    isCertifiedAgent: true,
    designation: 'Managing Partner & Certified Broker',
    agencyId: 'agency-2',
    companyName: 'Faisal Hills Premier Realty / Al-Sadat',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    phone: '+92 300 9876543',
    whatsapp: '+92 300 9876543',
    verified: true,
    licenseNumber: 'ICT-ISB-AG-2025-412',
    memberSince: 'June 2024',
    address: 'Plaza 24, Civic Centre, B-17 & Faisal Hills, Islamabad',
    bio: 'Authorized sales partner for master-planned societies and luxury apartment developments.',
    permissions: [
      'create_listings',
      'edit_own_listings',
      'delete_own_listings',
      'manage_own_advibe',
      'view_assigned_leads',
      'schedule_tours'
    ],
    notificationPreferences: {
      email: true,
      whatsapp: true,
      leads: true,
      tourAlerts: false
    }
  },
  {
    id: 'user-agency-taxila',
    name: 'Malik Jahangir Khan',
    username: 'taxila',
    email: 'taxila@ri8click.com',
    password: 'taxila123',
    role: 'agency',
    isCertifiedAgent: true,
    designation: 'Director of Investments & Certified Agent',
    agencyId: 'agency-4',
    companyName: 'Taxila City Realtors & Consultants',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    phone: '+92 336 5666727',
    whatsapp: '+92 336 5666727',
    verified: true,
    licenseNumber: 'RDA-TAX-AG-2024-105',
    memberSince: 'August 2024',
    address: 'Main GT Road, Museum Chowk, Taxila Cantt',
    bio: 'Heritage and modern property consultancy specializing in GT Road and Margalla corridor developments.',
    permissions: [
      'create_listings',
      'edit_own_listings',
      'delete_own_listings',
      'manage_own_advibe',
      'view_assigned_leads',
      'schedule_tours'
    ],
    notificationPreferences: {
      email: false,
      whatsapp: true,
      leads: true,
      tourAlerts: true
    }
  },
  {
    id: 'user-agency-sapphire',
    name: 'Mian Ahmed (Sapphire Properties)',
    username: 'sapphire',
    email: 'sapphire@ri8click.com',
    password: 'sapphire123',
    role: 'agency',
    isCertifiedAgent: true,
    designation: 'Principal Investment Consultant & Certified Partner',
    agencyId: 'agency-sapphire',
    companyName: 'Sapphire Properties & Athar Associates',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    phone: '+92 336 5666727',
    whatsapp: '+92 336 5666727',
    verified: true,
    licenseNumber: 'LDA-LHR-AG-2024-512',
    memberSince: 'January 2024',
    address: 'Main Boulevard, Bahria Town Ring Road SL3 Interchange, Lahore',
    bio: 'Authorized sales and marketing consultant for Icon Mall & Towers Lahore and premier high-rise commercial developments.',
    permissions: [
      'create_listings',
      'edit_own_listings',
      'delete_own_listings',
      'manage_own_advibe',
      'view_assigned_leads',
      'schedule_tours'
    ],
    notificationPreferences: {
      email: true,
      whatsapp: true,
      leads: true,
      tourAlerts: true
    }
  },
  {
    id: 'user-customer-1',
    name: 'Tariq Mehmood',
    username: 'investor',
    email: 'investor@gmail.com',
    password: 'investor123',
    role: 'customer',
    designation: 'Private Portfolio Investor',
    companyName: 'Overseas Private Investor',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
    phone: '+44 7700 900123',
    whatsapp: '+44 7700 900123',
    verified: true,
    memberSince: 'September 2024',
    address: 'London, UK / Islamabad, Pakistan',
    bio: 'High-net-worth overseas Pakistani investor exploring commercial and residential assets.',
    permissions: [
      'view_listings',
      'save_listings',
      'submit_leads',
      'schedule_tours'
    ],
    notificationPreferences: {
      email: true,
      whatsapp: false,
      leads: false,
      tourAlerts: true
    }
  }
];
