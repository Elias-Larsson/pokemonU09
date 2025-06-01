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
        className = {color === "red" ? "bg-primary-red hover:bg-secondary-red font-bold py-2 px-4 border-secondary-red border-b-3 border-r-3" :
        color === "yellow" ? "bg-primary-yellow hover:bg-secondary-yellow font-bold py-2 px-4  border-secondary-yellow border-b-3 border-r-3" :
        "bg-white hover:bg-gray-200 font-bold py-2 px-4  border-gray-200 border-b-3 border-r-3"
        }>
        {name}
        </Link>
    )
}