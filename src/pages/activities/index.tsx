import Header from '@/components/Header';
import Map from '@/components/Map';
import Tabs from '@/components/Tabs';
import ActivityCard from '@/components/ActivityCard';
import DaysInput from '@/components/DaysInput';
import ActivitiesError from '@/components/ActivitiesError';
import { useEffect, useState } from 'react';

export default function Activities({activities}: any) {
    const [days, setDays] = useState();
    const [daysError, setDaysError] = useState(false);
    const [activitiesError, setActivitiesError] = useState(false);
    const [selected, setSelected] = useState(false);
    const selectedActivities: number[] = [];
    const tabs: string[] = [
        "Strand", "Natuur", "Cultuur", "Dieren",
        "Waterval", "Kinderen", "Uitzichtpunt",
        "Ontspannen", "Actief", "Uitgaan",
        "Wateractiviteit", "Snorkelen", "Sport"
    ];
    const [activeTab, setActiveTab] = useState("Strand");
    const [tabStatus, setTabStatus] = useState(false);

    if (typeof window !== 'undefined') {
        const storage = { ... localStorage };
        const storageValues = Object.keys(storage).filter(a => a.length <= 2);
        const daysStorage = Object.keys(storage).filter(a => a === "days");
        storageValues.map(value => selectedActivities.push(Number(value)));

        useEffect(() => {
            daysStorage &&
                setDays(storage[daysStorage[0]])

            selectedActivities.length > 0 ?
                setSelected(true) :
                setSelected(false)

            storage['tab'] !== undefined &&
                setActiveTab(storage['tab']);
            setTabStatus(true);
        }, []);
    }

    const [locationStatus, setLocationStatus] = useState(false);
    let selectedLocations: string[] = [];
    selectedActivities.map(id => {
        const location = activities[id].location;
        selectedLocations.push(location);
    });

    const handleTab = (tab: string) => {
        setActiveTab(tab);
        localStorage.setItem('tab', tab);
        window.scrollTo({top: 0});
    }

    const handleFavourite = (id: number) => {
        const index = selectedActivities.indexOf(id);

        selectedActivities.indexOf(id) === -1 ? 
            selectedActivities.push(id) :
            selectedActivities.splice(index, 1);
        
        selectedLocations = [];
        selectedActivities.map(id => {
            let location = activities[id].location;

            selectedLocations.push(location);
        });
        setLocationStatus(!locationStatus);
        
        selectedActivities.length > 0 ?
            setSelected(true) :
            setSelected(false)

        localStorage.clear();
        selectedActivities.map(activity => localStorage.setItem(activity.toString(), activity.toString()));
        days && localStorage.setItem('days', Math.round(days).toString());
    }

    const handleSubmit = (e: any) => {
        if(days && Number(days) >= 7 && Number(days) <= 60) {
            if(selectedActivities.length / days < 1 && !activitiesError) {
                setActivitiesError(true);
                e.preventDefault();
            } else {
                localStorage.setItem('days', Math.round(days).toString());
            }
        } else {
            e.preventDefault();
            setDaysError(true);
        }
    }

    const handleChange = (e: any) => {
        setDays(e.target.value);
        setDaysError(false);
        localStorage.setItem('days', e.target.value);

        localStorage.getItem('Canggu-content') !== null &&
            localStorage.removeItem('Canggu-content');

        localStorage.getItem('Ubud-content') !== null &&
            localStorage.removeItem('Ubud-content');

        localStorage.getItem('Amed-content') !== null &&
            localStorage.removeItem('Amed-content');

        localStorage.getItem('Nusa-content') !== null &&
            localStorage.removeItem('Nusa-content');

        localStorage.getItem('Uluwatu-content') !== null &&
            localStorage.removeItem('Uluwatu-content');
    }
    
    return (
        <main>
            <div className='fixed bg-primary-light z-10 before:absolute before:bottom-0 before:left-[calc(100vw/12*0.5)] before:w-[calc(100vw/12*11)] before:h-[1px] before:bg-primary-dark before:opacity-20'>
                <Header
                    info={true}
                    rightAlt='Navigatie naar Belangrijke informatie'
                    check={selected && true}
                    leftAlt="Selectie afronden"
                    onSubmit={handleSubmit}
                />

                <DaysInput 
                    onChange={(e) => handleChange(e)}
                    days={days ? days : ''}
                    daysError={daysError}
                />

                <Map
                    locations={selectedLocations}
                />
                
                {
                    tabStatus &&
                        <Tabs 
                            onClick={(tab) => handleTab(tab)}
                            tabs={tabs}
                            activeTab={activeTab}
                        />
                }
            </div>

            <div className='pt-[395px] pb-4'>
                {activities.map((activity: any, index: number) => {
                    const tags = activity.tags.split(', ');
                    
                    return tags.includes(activeTab) &&
                        <ActivityCard
                            key={index}
                            onClick={(id) => handleFavourite(id)}
                            activity={activity}
                        />
                })}
            </div>

            {
                activitiesError &&
                    <ActivitiesError
                        onClickCancel={() => setActivitiesError(false)}
                        onClickSubmit={handleSubmit}
                    />
            }
        </main>
    );
}

// Fetching local activities json
import fsPromises from 'fs/promises';
import path from 'path';

export async function getStaticProps() {
    const filePath = path.join(process.cwd(), 'activities.json');
    const jsonData = await fsPromises.readFile(filePath);
    const activities = JSON.parse(jsonData.toString());
  
    return {
      props: {
        activities: activities.attractions
      }
    }
}