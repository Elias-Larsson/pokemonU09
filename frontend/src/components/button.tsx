import { Link } from "react-router";

type Props = {
    name: string;
    color: "red" | "yellow" | "white";
    route: string;
}
export const Button = ({name, color, route}: Props) => {

    return (
        <Link
        to={route}
        className = {color === "red" ? "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" :
        color === "yellow" ? "bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded" :
        "bg-white hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded"
        }>
        {name}
        </Link>
    )
}