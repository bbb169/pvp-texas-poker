import Card from "@/component/card/index.js";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { getPublicCards } from "../../api.js";
import { CardType } from "../../type.js";

export function PublicCard() {
    const [publicCard, setPublicCards] = useState<CardType[]>([]);

    const updatePublicCards = () => {
        getPublicCards().then(res => {
            setPublicCards([...res]);
        })
    }

    useEffect(() => {
        updatePublicCards();
    }, [])
            
    return <>
      {
          publicCard?.map((e) => {
              return <Card {...e} />
          })
      }
      <Button 
      key={'button2'}
      type='primary'
      onClick={() => {
          updatePublicCards();
      }}>next Cards</Button>
    </>
}