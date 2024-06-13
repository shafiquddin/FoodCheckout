import useHttp from "../hooks/useHttp";
import MealItem from "./MealItem";

const requestConfig = {};
const Meals = () => {

   const {data:loadedMeals,isLoading,error} = useHttp('http://localhost:3000/meals',requestConfig,[]);

   if(isLoading){
    return <p>Meals are loading</p>
   }

    return <ul id='meals'>
        {loadedMeals.map(meal=>{
            return <MealItem key={meal.id} meal={meal}/>
        })}
    </ul>
}

export default Meals;