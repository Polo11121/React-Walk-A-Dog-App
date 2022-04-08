import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Button } from "../../components/Button/Button";
import { DogCard } from "../../components/DogCard/DogCard";
import { Entypo } from "@expo/vector-icons";
import { styles } from "./dogListStyles";

export const DogListScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.title}>Psie profile</Text>
    <ScrollView contentContainerStyle={styles.dogList}>
      <DogCard
        name="Kox"
        race="Kundelek"
        image="https://ggsc.s3.amazonaws.com/images/uploads/The_Science-Backed_Benefits_of_Being_a_Dog_Owner.jpg"
      />
      <DogCard
        image="https://www.princeton.edu/sites/default/files/styles/half_2x/public/images/2022/02/KOA_Nassau_2697x1517.jpg?itok=iQEwihUn"
        name="Szef"
        race="Seagel"
      />
      <DogCard
        name="Pieseł"
        race="Shiba"
        image="https://bi.im-g.pl/im/d0/a9/e1/z14789072Q,Prawdopodobnie-najslawniejsze-zdjecie-Piesela.jpg"
      />
      <DogCard
        name="Kox"
        race="Kundelek"
        image="https://ggsc.s3.amazonaws.com/images/uploads/The_Science-Backed_Benefits_of_Being_a_Dog_Owner.jpg"
      />
      <DogCard
        image="https://www.princeton.edu/sites/default/files/styles/half_2x/public/images/2022/02/KOA_Nassau_2697x1517.jpg?itok=iQEwihUn"
        name="Szef"
        race="Seagel"
      />
      <DogCard
        name="Pieseł"
        race="Shiba"
        image="https://bi.im-g.pl/im/d0/a9/e1/z14789072Q,Prawdopodobnie-najslawniejsze-zdjecie-Piesela.jpg"
      />
    </ScrollView>
    <View style={styles.buttonContainer}>
      <Button
        isShadow
        onPress={() => null}
        icon={<Entypo name="pencil" size={24} color="black" />}
        buttonStyle={styles.addDogButton}
        titleStyle={styles.addDogButtonText}
        title="Dodaj psa"
      />
    </View>
  </View>
);
