import { type MouseEvent, type ReactNode } from "react"

export interface ButtonInterface {
    name: string
    className?: string
    onClick: (e: MouseEvent<HTMLButtonElement>) => void;
    children?: ReactNode;

}

export const MyButton = ({ onClick, name, className, children }: ButtonInterface) => {

    return (
        <>
            <div>
                <button
                    name={name}
                    className={className}
                    onClick={onClick}
                >
                    {children}
                </button>
            </div>
        </>
    )
}