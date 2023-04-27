import axios from "axios";
import { create, insertMultiple } from '@orama/orama'
// import {URL} from "../constants/backend"

const createInstance = async () => {

    try {

        const db = await create({
            schema: {
                name: "string",
                email: "string"
            }
        })  

        const res = await axios.get("/api/getTeachers")

        const ins = await insertMultiple(db,res.data.data)

        console.log(ins);

        return db;

    } catch (error) {
        console.log("course db error :-");
        console.log(error);
    }    
}

export const teachersDb = createInstance();
