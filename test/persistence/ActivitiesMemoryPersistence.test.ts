import { ActivitiesMemoryPersistence } from '../../src/persistence/ActivitiesMemoryPersistence';
import { ActivitiesPersistenceFixture } from './ActivitiesPersistenceFixture';

suite('ActivitiesMemoryPersistence', ()=> {
    let persistence: ActivitiesMemoryPersistence;
    let fixture: ActivitiesPersistenceFixture;
    
    setup(async () => {
        persistence = new ActivitiesMemoryPersistence();
        fixture = new ActivitiesPersistenceFixture(persistence);
        
        await persistence.open(null);
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
