import { ActivitiesFilePersistence } from '../../src/persistence/ActivitiesFilePersistence';
import { ActivitiesPersistenceFixture } from './ActivitiesPersistenceFixture';

suite('ActivitiesFilePersistence', ()=> {
    let persistence: ActivitiesFilePersistence;
    let fixture: ActivitiesPersistenceFixture;
    
    setup(async () => {
        persistence = new ActivitiesFilePersistence('./data/activities.test.json');

        fixture = new ActivitiesPersistenceFixture(persistence);
        
        await persistence.open(null);
        await persistence.clear(null);
    });
    
    teardown(async () => {
        await persistence.close(null);
    });
        
    test('Log Party Activities', async () => {
        await fixture.testLogPartyActivities();
    });

    test('Get Party Activities', async () => {
        await fixture.testGetPartyActivities();
    });
    
});