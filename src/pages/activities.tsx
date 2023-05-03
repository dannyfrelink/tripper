import Header from '@/components/Header';
import Map from '@/components/Map';
import Tabs from '@/components/Tabs';
import ActivityCard from '@/components/ActivityCard';
import Image from 'next/image';

export default function Activities({activities}: any) {
    // console.log("blabla: ", activities)

    return (
        <main>
            <div className='fixed bg-primary-light z-10'>
                <Header
                    info={true}
                    rightAlt='Navigatie naar Belangrijke informatie'
                />

                <Map />
            </div>

            {/* Padiding top aanpassen tot zichtbaar onder kaart */}
            <div className='pt-80'>
                {activities.map((activity: any) => 
                    <ActivityCard 
                        activity={activity}
                    />
                )}
            </div>

            {/* {activities.map((activity: any) => 
                <div className='w-1/3'>
                    <Image 
                        className='object-cover object-center'
                        width={500}
                        height={500}
                        src={activity.image.src}
                        alt={activity.image.alt} 
                    />
                </div>
            )} */}

            <Tabs>

            </Tabs>
        </main>
    )
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