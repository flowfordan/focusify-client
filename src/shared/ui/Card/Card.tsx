import { CardProps } from "./Card.props";
import './card.scss';
import cn from 'classnames';
import { ForwardedRef, forwardRef } from "react";

export const Card = forwardRef(function Card(
    { color='white', children, className, ...props }: CardProps, ref: ForwardedRef<HTMLDivElement>){

    return (
        <div className='card'
        {...props}
        ref={ref}
        >
          {children}
        </div>
    );
    
});