import axios from "axios";
import { create, insertMultiple} from '@orama/orama'

const createInstance = async () => {

    try {

        const db = await create({
            schema: {
                name: "string"
            }
        })  

        const res = await axios.get("api/getClasses")

        await insertMultiple(db,res.data.data)

        return db;

    } catch (error) {
        console.log("course db error :-");
        console.log(error);
    }    
}

export const courseDb = createInstance();
