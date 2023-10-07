import Card from "@/component/card/index.js";
import { CardType } from "../../type.js";

export function PublicCards({ publicCard }: { publicCard: CardType[] }) {
    return <>
      {
          publicCard?.map((e) => {
              return <Card {...e} />
          })
      }
    </>
}