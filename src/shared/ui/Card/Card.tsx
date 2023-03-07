import { CardProps } from "./Card.props";
import "./card.scss";
import cn from "classnames";
import { ForwardedRef, forwardRef } from "react";

export const Card = forwardRef(function Card(
  { color = "white", children, className, ...props }: CardProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <div
      className={cn("card", {
        ["card--blue"]: color === "blue",
      })}
      {...props}
      ref={ref}
    >
      {children}
    </div>
  );
});

//            className={cn(styles.input, {
//   [styles.error]: error
// })}
