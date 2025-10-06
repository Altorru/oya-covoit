import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import FerryCompanyTabs from './components/FerryCompanyTabs';
import DateSelector from './components/DateSelector';
import DestinationSelector from './components/DestinationSelector';
import FerryScheduleCard from './components/FerryScheduleCard';
import SearchFilters from './components/SearchFilters';
import LoadingSpinner from './components/LoadingSpinner';
import EmptyState from './components/EmptyState';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const FerryScheduleSearch = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  
  // Search state - simplified without round trip
  const [activeCompany, setActiveCompany] = useState('yeu-continent');
  const [departureDate, setDepartureDate] = useState('');
  const [selectedRoute, setSelectedRoute] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  
  // Filter state
  const [filters, setFilters] = useState({
    departureCity: '',
    maxPrice: 50,
    priceRange: { min: 0, max: 50 },
    luggageSpace: [],
    proximityRadius: 10,
    instantBooking: false,
    verifiedDrivers: false
  });

  // Mock data with fixed Compagnie Vendéenne schedules
  const ferryCompanies = [
    { id: 'yeu-continent', name: 'Yeu Continent' },
    { id: 'compagnie-vendeenne', name: 'Compagnie Vendéenne' }
  ];

  // Updated mock schedules with better Compagnie Vendéenne data
  const mockSchedules = [
    {
      id: 1,
      departure: '08:30',
      arrival: '09:15',
      duration: '45 min',
      price: 32.50,
      capacity: 180,
      status: 'available',
      company: 'yeu-continent',
      route: 'vers-fromentine'
    },
    {
      id: 2,
      departure: '10:45',
      arrival: '11:30',
      duration: '45 min',
      price: 32.50,
      capacity: 180,
      status: 'limited',
      company: 'yeu-continent',
      route: 'vers-fromentine'
    },
    {
      id: 3,
      departure: '14:15',
      arrival: '15:00',
      duration: '45 min',
      price: 32.50,
      capacity: 180,
      status: 'available',
      company: 'yeu-continent',
      route: 'vers-fromentine'
    },
    {
      id: 4,
      departure: '17:30',
      arrival: '18:15',
      duration: '45 min',
      price: 32.50,
      capacity: 180,
      status: 'full',
      company: 'yeu-continent',
      route: 'vers-fromentine'
    },
    // Fixed Compagnie Vendéenne schedules
    {
      id: 5,
      departure: '09:00',
      arrival: '09:50',
      duration: '50 min',
      price: 28.00,
      capacity: 150,
      status: 'available',
      company: 'compagnie-vendeenne',
      route: 'vers-saint-gilles'
    },
    {
      id: 6,
      departure: '11:15',
      arrival: '12:05',
      duration: '50 min',
      price: 28.00,
      capacity: 150,
      status: 'available',
      company: 'compagnie-vendeenne',
      route: 'vers-saint-gilles'
    },
    {
      id: 7,
      departure: '15:45',
      arrival: '16:35',
      duration: '50 min',
      price: 28.00,
      capacity: 150,
      status: 'limited',
      company: 'compagnie-vendeenne',
      route: 'vers-saint-gilles'
    },
    {
      id: 8,
      departure: '10:30',
      arrival: '11:15',
      duration: '45 min',
      price: 30.00,
      capacity: 120,
      status: 'available',
      company: 'compagnie-vendeenne',
      route: 'vers-barbatre'
    }
  ];

  const mockDriverCounts = {
    1: 3,
    2: 1,
    3: 5,
    4: 0,
    5: 2,
    6: 4,
    7: 1,
    8: 3
  };

  // Initialize with today's date
  useEffect(() => {
    const today = new Date()?.toISOString()?.split('T')?.[0];
    setDepartureDate(today);
  }, []);

  // Simulate API call when search parameters change
  useEffect(() => {
    if (departureDate && selectedRoute) {
      setIsLoading(true);
      setTimeout(() => {
        let filteredSchedules = mockSchedules?.filter(
          schedule => schedule?.route === selectedRoute
        );
        
        // Apply company filter if needed
        if (activeCompany !== 'all') {
          filteredSchedules = filteredSchedules?.filter(
            schedule => schedule?.company === activeCompany
          );
        }
        
        setSearchResults(filteredSchedules);
        setIsLoading(false);
      }, 1000);
    }
  }, [activeCompany, departureDate, selectedRoute]);

  const handleSelectFerry = (schedule) => {
    // Navigate to driver list or booking page
    navigate('/booking-confirmation', { 
      state: { 
        ferry: schedule, 
        date: departureDate,
        filters: filters 
      } 
    });
  };

  const handleCreateTrip = () => {
    navigate('/create-trip');
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date?.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6 pb-24 md:pb-6">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Search" size={24} color="var(--color-primary)" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Recherche de trajets</h1>
          </div>
          <p className="text-muted-foreground">
            Trouvez des covoiturages basés sur les horaires officiels des ferries
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Search Controls */}
          <div className="lg:col-span-1 space-y-6">
            <FerryCompanyTabs
              activeCompany={activeCompany}
              onCompanyChange={setActiveCompany}
              companies={ferryCompanies}
            />
            
            <DateSelector
              departureDate={departureDate}
              onDepartureDateChange={setDepartureDate}
            />
            
            <DestinationSelector
              selectedRoute={selectedRoute}
              onRouteChange={setSelectedRoute}
              routes={[
                { id: 'vers-fromentine', name: 'Vers Fromentine' },
                { id: 'vers-saint-gilles', name: 'Vers Saint-Gilles' },
                { id: 'vers-barbatre', name: 'Vers Barbâtre' }
              ]}
            />
            
            <SearchFilters
              filters={filters}
              onFiltersChange={setFilters}
              isOpen={isFiltersOpen}
              onToggle={() => setIsFiltersOpen(!isFiltersOpen)}
            />
          </div>

          {/* Search Results */}
          <div className="lg:col-span-3">
            <div className="bg-card rounded-lg p-6 maritime-shadow-sm border border-border">
              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-foreground">
                    Horaires disponibles
                  </h2>
                  {departureDate && selectedRoute && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {formatDate(departureDate)} • {selectedRoute?.includes('vers') ? 'Aller simple' : 'Trajet'}
                    </p>
                  )}
                </div>
                
                {searchResults?.length > 0 && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon name="Clock" size={16} />
                    <span>Mis à jour il y a 2 min</span>
                  </div>
                )}
              </div>

              {/* Loading State */}
              {isLoading && (
                <LoadingSpinner message="Synchronisation avec les API maritimes..." />
              )}

              {/* Empty State */}
              {!isLoading && (!departureDate || !selectedRoute) && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Calendar" size={32} color="var(--color-muted-foreground)" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Sélectionnez vos critères
                  </h3>
                  <p className="text-muted-foreground">
                    Choisissez une date et une destination pour voir les horaires disponibles
                  </p>
                </div>
              )}

              {/* No Results */}
              {!isLoading && departureDate && selectedRoute && searchResults?.length === 0 && (
                <EmptyState onCreateTrip={handleCreateTrip} />
              )}

              {/* Results Grid */}
              {!isLoading && searchResults?.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {searchResults?.map((schedule) => (
                    <FerryScheduleCard
                      key={schedule?.id}
                      schedule={schedule}
                      availableDrivers={mockDriverCounts?.[schedule?.id] || 0}
                      onSelectFerry={handleSelectFerry}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Quick Actions */}
            {!isLoading && searchResults?.length > 0 && (
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  onClick={handleCreateTrip}
                  iconName="Plus"
                  iconPosition="left"
                  className="flex-1"
                >
                  Créer mon trajet
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => window.location?.reload()}
                  iconName="RefreshCw"
                  iconPosition="left"
                  className="flex-1"
                >
                  Actualiser les horaires
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default FerryScheduleSearch;