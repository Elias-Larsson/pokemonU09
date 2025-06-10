import { Link } from "react-router-dom";

type Props = {
    buttonType: "click" | "link";
    name: string;
    color: "red" | "yellow" | "white";
    route?: string;
    onClick?: () => void;
    disabled?: boolean;
};

export const Button = ({ name, color, route, buttonType, disabled, onClick }: Props) => {
    const className =
        color === "red"
            ? "bg-primary-red hover:bg-secondary-red font-bold py-2 px-4 border-secondary-red border-b-3 border-r-3"
            : color === "yellow"
            ? "bg-primary-yellow hover:bg-secondary-yellow font-bold py-2 px-4 border-secondary-yellow border-b-3 border-r-3"
            : "bg-white hover:bg-gray-200 font-bold py-2 px-4 border-gray-200 border-b-3 border-r-3";

    if (buttonType === "link" && route) {
        return (
            <Link to={route} className={className}>
                {name}
            </Link>
        );
    } else {
        return (
            <button onClick={onClick} className={className} disabled={disabled}>
                {name}
            </button>
        );
    }
};