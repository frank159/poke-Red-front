import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom";
import {HeaderHome} from "../../componentes/headerHome/headerHome"
import PatientCard from "../../componentes/PokeCard/PokeCard"
import GlobalStateContext from "../../Context/GlobalContextState"
import { goToPokeDetalhes} from "../../routes/coordinator"
import { Conteiner } from "./Styled"
import {PokeFilter} from "../../componentes/pokeFilter/pokeFilter"
import {BASE_URL} from "../../constants/Url"

export const HomePage = () => {
    const history = useHistory();
    const { requests, filter } = useContext(GlobalStateContext);
    
    useEffect(() => {
      requests.getPoke()
      if (filter.text) {
        fetch(`${BASE_URL}/search?pokeName=${filter.text}`)
          .then ((response) => response.json())
          .then ((response) => {
            console.log(response);
          })
      }
    },[filter.text])

    const onClickCard = (id) => {
      goToPokeDetalhes(history, id);
    };

    const pokeList =
    !requests.loading &&
    requests.poke &&
    requests.poke.map((poke) => {
      return (
      
        <PatientCard
          key={poke.id}
          pokeName={poke.pokeName}
          pokeType={poke.pokeType}
          pokeHeight={poke.pokeHeight}
          onClickCard={() => onClickCard(poke.id)}
        />
      );
    });
    console.log(filter.text)
    return (
        <div>
            <HeaderHome/>
            <PokeFilter value={filter.text} onChange={(string) => filter.setText(string)}/>
            <Conteiner>
            {pokeList}
            </Conteiner>
        </div>
    )
}