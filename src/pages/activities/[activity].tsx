import Header from '@/components/Header';
import ActivityDetails from '@/components/ActivityDetails';

export default function ActivitiesDetail({activity}: any) {
    const [favouriteActivity, setFavouriteActivity] = useState(false);
    const selectedActivities: number[] = [];

    if (typeof window !== 'undefined') {
        const storage = { ... localStorage };
        const storageValues = Object.keys(storage).filter(a => a.length === 1);
        storageValues.map(value => selectedActivities.push(Number(value)));

        useEffect(() => {
            selectedActivities.includes(activity.id) ?
                setFavouriteActivity(true) :
                setFavouriteActivity(false)
        }, [])
    }

    const handleFavourite = () => {
        setFavouriteActivity(!favouriteActivity);
        const index = selectedActivities.indexOf(activity.id);

        selectedActivities.indexOf(activity.id) === -1 ? 
            selectedActivities.push(activity.id) :
            selectedActivities.splice(index, 1);

        localStorage.clear();
        selectedActivities.map(activity => localStorage.setItem(activity.toString(), activity.toString()));
    }

    return (
        <main>
            <Header
                info={true}
                rightAlt='Navigeren naar Belangrijke informatie'
                backArrow={true}
            />

            <ActivityDetails
                activity={activity}
                onClick={handleFavourite}
                favouriteActivity={favouriteActivity}
            />

            <div className='text-primary-dark text-[15px] w-11/12 mx-auto px-3.5 [&>*:not(:first-of-type)]:mt-2.5 my-6'>
                {activity.details.split('//').map((paragraph: string) => 
                    <p>{paragraph}</p>
                )}

                <a className='block w-fit text-[15px] border-[1px] border-primary-dark rounded-md py-0.5 px-1.5 mt-4' href="/activities">Verder zoeken</a>
            </div>
        </main>
    )
}

// Fetching local activities json
import fsPromises from 'fs/promises';
import path from 'path';
import { useEffect, useState } from 'react';

export async function getStaticPaths() {
    const filePath = path.join(process.cwd(), 'activities.json');
    const jsonData = await fsPromises.readFile(filePath);
    const json = JSON.parse(jsonData.toString());
    const activities = json.attractions;
  
    const paths = activities.map((activity: any) => ({
      params: { activity: activity.id.toString() },
    }))
  
    return { paths, fallback: false }
}

// Filter out current activity
export async function getStaticProps({params}: any) {
    const filePath = path.join(process.cwd(), 'activities.json');
    const jsonData = await fsPromises.readFile(filePath);
    const json = JSON.parse(jsonData.toString());
    const activities = json.attractions;

    return {
        props: {
            activity: activities[params.activity]
        }
    }
}