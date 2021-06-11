export const AttConverter = (features) => {

    return features.map(
        (feature, idx)=> {
            const {
                FID, NAME, ST, POPULATION, POP2010, WHITE, BLACK,
                AMERI_ES, ASIAN, HAWN_PI, HISPANIC, OTHER, MULT_RACE,
                MALES, FEMALES
            } = feature.attributes;
            return {
                id: FID,
                name: NAME,
                state: ST,
                lat:feature.geometry.y, 
                lon:feature.geometry.x, 
                rank: idx+1,
                population: POPULATION,
                population_2010: POP2010,
                white: WHITE,
                black: BLACK,
                native_american: AMERI_ES,
                asian: ASIAN,
                pacific_islander: HAWN_PI,
                hispanic: HISPANIC,
                other: OTHER,
                multi_race: MULT_RACE,
                male: MALES,
                female: FEMALES                                     
            };
        }
    )
    .map(
        (attributes)=>{
            const {
                white, black, native_american, population_2010,
                asian, pacific_islander, hispanic, other, multi_race
            } = attributes;
            return{
                ...attributes,
                pct_white: white / population_2010,
                pct_black: black / population_2010,
                pct_native_american: native_american / population_2010,
                pct_asian: asian / population_2010,
                pct_pacific_islander: pacific_islander / population_2010,
                pct_hispanic: hispanic / population_2010,
                pct_other: other / population_2010,
                pct_multi_race: multi_race / population_2010
            };
        }
    );
    
};