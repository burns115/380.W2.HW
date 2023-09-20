import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { RadioButton } from "react-native-paper";
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { white } from "react-native-paper/lib/typescript/styles/themes/v2/colors";

export function CharCreator() {
    const navigation = useNavigation();

    const [character, setCharacter] = useState({
        id: '',
        name: '',
        race: '',
        subrace: '',
        mclass: '',
        subclass: '',
        background: '',
    });

    const handleNameChange = (name : string) => {
        setCharacter({ ...character, name });
    };

    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedRace, setSelectedRace] = useState(String || null);
    const [selectedSubrace, setSelectedSubrace] = useState(String || null);
    
    const [selectedClass, setSelectedClass] = useState(String || null);
    const [selectedSubclass, setSelectedSubclass] = useState(String || null);

    const [selectedBackground, setSelectedBackground] = useState(String || null);

    
    const customizationSections = {
        race: <Text></Text>,
        class: <Text></Text>,
        background: <Text></Text>
    };

    const handleDropdownChange = (itemValue) => {
        setCharacter({ ...character, itemValue });
        setSelectedOption(itemValue);
    }

    const handleClassChange = (mclass : string) => {
        setCharacter({ ...character, mclass });
        setSelectedClass(mclass);
        setSelectedSubclass('');
    }

    const handleSubclassChange = (subclass : string) => {
        setCharacter({ ...character, subclass });
        setSelectedSubclass(subclass);
    }

    const handleBackgroundChange = (background : string) => {
        setCharacter({ ...character, background });
        setSelectedBackground(background);
    }

    const handleRaceChange = (race : string) => {
        setCharacter({ ...character, race });
        setSelectedRace(race);
        setSelectedSubrace('');
    }

    const handleSubraceChange = (subrace : string) => {
        setCharacter({ ...character, subrace });
        setSelectedSubrace(subrace);
    }

    const renderBackgroundSection = () => {
        if (selectedOption === 'background') {
            return (
                <View style={styles.classContainer}>
                    <View style={styles.classColumn}>
                        <RadioButton.Group
                            onValueChange={handleBackgroundChange}
                            value={selectedBackground}
                        >
                            <RadioButton.Item labelStyle={{ color: 'white' }} label="Acolyte" value="Acolyte" />
                            <RadioButton.Item labelStyle={{ color: 'white' }} label="Charlatan" value="Charlatan" />
                            <RadioButton.Item labelStyle={{ color: 'white' }} label="Criminal" value="Criminal" />
                            <RadioButton.Item labelStyle={{ color: 'white' }} label="Entertainer" value="Entertainer" />
                            <RadioButton.Item labelStyle={{ color: 'white' }} label="Folk Hero" value="Folk Hero" />
                            <RadioButton.Item labelStyle={{ color: 'white' }} label="Guild Artisan" value="Guild Artisan" />
                        </RadioButton.Group>
                    </View>
                    <View style={styles.classColumn}>
                        <RadioButton.Group
                            onValueChange={handleBackgroundChange}
                            value={selectedBackground}
                        >
                            <RadioButton.Item label="Noble" value="Noble" />
                            <RadioButton.Item label="Outlander" value="Outlander" />
                            <RadioButton.Item label="Sage" value="Sage" />
                            <RadioButton.Item label="Soldier" value="Soldier" />
                            <RadioButton.Item label="Urchin" value="Urchin" />
                        </RadioButton.Group>
                    </View>
                </View>
            );
        } else {
            return null;
        }
    };

    const renderClassSection = () => {
        if (selectedOption === 'class') {
            return (
                <View style={styles.raceContainer}>
                    <View style={styles.raceColumn}>
                        <RadioButton.Group
                            onValueChange={handleClassChange}
                            value={selectedClass}
                        >
                            <RadioButton.Item labelStyle={{ color: 'white' }} label="Fighter" value="Fighter" />
                            <RadioButton.Item labelStyle={{ color: 'white' }} label="Barbarian" value="Barbarian" />
                            <RadioButton.Item labelStyle={{ color: 'white' }} label="Rogue" value="Rogue" />
                            <RadioButton.Item labelStyle={{ color: 'white' }} label="Druid" value="Druid" />
                            <RadioButton.Item labelStyle={{ color: 'white' }} label="Wizard" value="Wizard" />
                            <RadioButton.Item labelStyle={{ color: 'white' }} label="Paladin" value="Paladin" />
                        </RadioButton.Group>
                    </View>
                    <View style={styles.raceColumn}>
                        <RadioButton.Group
                            onValueChange={handleClassChange}
                            value={selectedClass}
                        >
                            <RadioButton.Item labelStyle={{ color: 'white' }} label="Sorcerer" value="Sorcerer" />
                            <RadioButton.Item labelStyle={{ color: 'white' }} label="Cleric" value="Cleric" />
                            <RadioButton.Item labelStyle={{ color: 'white' }} label="Warlock" value="Warlock" />
                            <RadioButton.Item labelStyle={{ color: 'white' }} label="Monk" value="Monk" />
                            <RadioButton.Item labelStyle={{ color: 'white' }} label="Ranger" value="Ranger" />
                            <RadioButton.Item labelStyle={{ color: 'white' }} label="Bard" value="Bard" />
                        </RadioButton.Group>
                    </View>
                </View>
            );
        } else {
            return null;
        }
    };

    const renderSubClassSection = () => {
        if (selectedClass === 'Fighter' && selectedOption === 'class') {
            return (
            <View style={styles.sectionContainerStyle}>
                <Text style={styles.sectionTitleStyle}>Choose Subclass:</Text>
                <ScrollView style={styles.scrollViewStyle}>
                    <RadioButton.Group
                        onValueChange={handleSubclassChange}
                        value={selectedSubclass}
                    >
                        <RadioButton.Item labelStyle={{ color: 'white' }} label="Battle Master" value="Battle Master" />
                        <RadioButton.Item labelStyle={{ color: 'white' }} label="Eldritch Knight" value="Eldritch Knight" />
                        <RadioButton.Item labelStyle={{ color: 'white' }} label="Champion" value="Champion" />
                    </RadioButton.Group>
                </ScrollView>
                
            </View>
            );
        } 
        else if (selectedClass === 'Barbarian' && selectedOption === 'class') {
            return (
                <View style={styles.sectionContainerStyle}>
                    <Text style={styles.sectionTitleStyle}>Choose Subclass:</Text>
                    <ScrollView style={styles.scrollViewStyle}>
                        <RadioButton.Group
                            onValueChange={handleSubclassChange}
                            value={selectedSubclass}
                        >
                            <RadioButton.Item labelStyle={{ color: 'white' }} label="Berserker" value="Berserker" />
                            <RadioButton.Item labelStyle={{ color: 'white' }} label="Wildheart" value="Wildheart" />
                            <RadioButton.Item labelStyle={{ color: 'white' }} label="Wild Magic" value="Wild Magic" />
                        </RadioButton.Group>
                    </ScrollView>
                </View>
            );
        }
        else if (selectedClass === 'Druid' && selectedOption === 'class') {
            return (
                <View style={styles.sectionContainerStyle}>
                    <Text style={styles.sectionTitleStyle}>Choose Subclass:</Text>
                    <ScrollView style={styles.scrollViewStyle}>
                        <RadioButton.Group
                            onValueChange={handleSubclassChange}
                            value={selectedSubclass}
                        >
                            <RadioButton.Item labelStyle={{ color: 'white' }} label="Land" value="Land" />
                            <RadioButton.Item labelStyle={{ color: 'white' }} label="Moon" value="Moon" />
                            <RadioButton.Item labelStyle={{ color: 'white' }} label="Spores" value="Spores" />
                        </RadioButton.Group>
                    </ScrollView>
                    
                </View>
            );
        }
        else if (selectedClass === 'Ranger' && selectedOption === 'class') {
            return (
                <View style={styles.sectionContainerStyle}>
                    <Text style={styles.sectionTitleStyle}>Choose Subclass:</Text>
                    <ScrollView style={styles.scrollViewStyle}>
                        <RadioButton.Group
                            onValueChange={handleSubclassChange}
                            value={selectedSubclass}
                        >
                            <RadioButton.Item labelStyle={{ color: 'white' }} label="Hunter" value="Hunter" />
                            <RadioButton.Item labelStyle={{ color: 'white' }} label="Beast Master" value="Beast Master" />
                            <RadioButton.Item labelStyle={{ color: 'white' }} label="Gloom Stalker" value="Gloom Stalker" />
                        </RadioButton.Group>
                    </ScrollView>
                    
                </View>
            );
        }
        else if (selectedClass === 'Rogue' && selectedOption === 'class') {
            return (
                <View style={styles.sectionContainerStyle}>
                    <Text style={styles.sectionTitleStyle}>Choose Subclass:</Text>
                    <ScrollView style={styles.scrollViewStyle}>
                        <RadioButton.Group
                            onValueChange={handleSubclassChange}
                            value={selectedSubclass}
                        >
                            <RadioButton.Item labelStyle={{ color: 'white' }} label="Arcane Trickster" value="Arcane Trickster" />
                            <RadioButton.Item labelStyle={{ color: 'white' }} label="Assassin" value="Assassin" />
                            <RadioButton.Item labelStyle={{ color: 'white' }} label="Thief" value="Thief" />
                        </RadioButton.Group>
                    </ScrollView>
                    
                </View>
            );
        }
        else if (selectedClass === 'Sorcerer' && selectedOption === 'class') {
            return (
                <View style={styles.sectionContainerStyle}>
                    <Text style={styles.sectionTitleStyle}>Choose Subclass:</Text>
                    <ScrollView style={styles.scrollViewStyle}>
                        <RadioButton.Group
                            onValueChange={handleSubclassChange}
                            value={selectedSubclass}
                        >
                            <RadioButton.Item labelStyle={{ color: 'white' }} label="Wild Magic" value="Wild Magic" />
                            <RadioButton.Item labelStyle={{ color: 'white' }} label="Draconic Bloodline" value="Draconic Bloodline" />
                            <RadioButton.Item labelStyle={{ color: 'white' }} label="Strom Sorcery" value="Storm Sorcery" />
                        </RadioButton.Group>
                    </ScrollView>
                    
                </View>
            );
        }
        else if (selectedClass === 'Bard' && selectedOption === 'class') {
            return (
                <View style={styles.sectionContainerStyle}>
                    <Text style={styles.sectionTitleStyle}>Choose Subclass:</Text>
                    <ScrollView style={styles.scrollViewStyle}>
                        <RadioButton.Group
                            onValueChange={handleSubclassChange}
                            value={selectedSubclass}
                        >
                            <RadioButton.Item labelStyle={{ color: 'white' }} label="Lore" value="Lore" />
                            <RadioButton.Item labelStyle={{ color: 'white' }} label="Valor" value="Valor" />
                            <RadioButton.Item labelStyle={{ color: 'white' }} label="Swords" value="Swords" />
                        </RadioButton.Group>
                    </ScrollView>
                    
                </View>
            );
        }
        else if (selectedClass === 'Monk' && selectedOption === 'class') {
            return (
                <View style={styles.sectionContainerStyle}>
                    <Text style={styles.sectionTitleStyle}>Choose Subclass:</Text>
                    <ScrollView style={styles.scrollViewStyle}>
                        <RadioButton.Group
                            onValueChange={handleSubclassChange}
                            value={selectedSubclass}
                        >
                            <RadioButton.Item labelStyle={{ color: 'white' }} label="Open Hand" value="Open Hand" />
                            <RadioButton.Item labelStyle={{ color: 'white' }} label="Shadow" value="Shadow" />
                            <RadioButton.Item labelStyle={{ color: 'white' }} label="Four Elements" value="Four Elements" />
                        </RadioButton.Group>
                    </ScrollView>
                    
                </View>
            );
        }
        else if (selectedClass === 'Warlock' && selectedOption === 'class') {
            return (
                <View style={styles.sectionContainerStyle}>
                    <Text style={styles.sectionTitleStyle}>Choose Subclass:</Text>
                    <ScrollView style={styles.scrollViewStyle}>
                        <RadioButton.Group
                            onValueChange={handleSubclassChange}
                            value={selectedSubclass}
                        >
                            <RadioButton.Item labelStyle={{ color: 'white' }} label="Archfey" value="Archfey" />
                            <RadioButton.Item labelStyle={{ color: 'white' }} label="Fiend" value="Fiend" />
                            <RadioButton.Item labelStyle={{ color: 'white' }} label="Great Old One" value="Great Old One" />
                        </RadioButton.Group>
                    </ScrollView>
                    
                </View>
            );
        }
        else if (selectedClass === 'Paladin' && selectedOption === 'class') {
            return (
                <View style={styles.sectionContainerStyle}>
                    <Text style={styles.sectionTitleStyle}>Choose Subclass:</Text>
                    <ScrollView style={styles.scrollViewStyle}>
                        <RadioButton.Group
                            onValueChange={handleSubclassChange}
                            value={selectedSubclass}
                        >
                            <RadioButton.Item labelStyle={{ color: 'white' }} label="Ancients" value="Ancients" />
                            <RadioButton.Item labelStyle={{ color: 'white' }} label="Devotion" value="Devotion" />
                            <RadioButton.Item labelStyle={{ color: 'white' }} label="Vengeance" value="Vengeance" />
                        </RadioButton.Group>
                    </ScrollView>
                    
                </View>
            );
        }
        else if (selectedClass === 'Cleric' && selectedOption === 'class') {
            return (
                <View style={styles.sectionContainerStyle}>
                    <Text style={styles.sectionTitleStyle}>Choose Subclass:</Text>
                    <ScrollView style={styles.scrollViewStyle}>
                        <View style={styles.subclassContainer}>
                            <View style={styles.subclassColumn}>
                                <RadioButton.Group
                                    onValueChange={handleSubclassChange}
                                    value={selectedSubclass}
                                >
                                    <RadioButton.Item labelStyle={{ color: 'white' }} label="Knowledge" value="Knowledge" />
                                    <RadioButton.Item labelStyle={{ color: 'white' }} label="Life" value="Life" />
                                    <RadioButton.Item labelStyle={{ color: 'white' }} label="Light" value="Light" />
                                    <RadioButton.Item labelStyle={{ color: 'white' }} label="Nature" value="Nature" />
                                </RadioButton.Group>
                            </View>
                            <View style={styles.subclassColumn}>
                                <RadioButton.Group
                                    onValueChange={handleSubclassChange}
                                    value={selectedSubclass}
                                >
                                    <RadioButton.Item labelStyle={{ color: 'white' }} label="Tempest" value="Tempest" />
                                    <RadioButton.Item labelStyle={{ color: 'white' }} label="Trickery" value="Trickery" />
                                    <RadioButton.Item labelStyle={{ color: 'white' }} label="War" value="War" />
                                </RadioButton.Group>
                            </View>
                        </View>
                        
                    </ScrollView>
                    
                </View>
            );
        }
        else if (selectedClass === 'Wizard' && selectedOption === 'class') {
            return (
                <View style={styles.sectionContainerStyle}>
                    <Text style={styles.sectionTitleStyle}>Choose Subclass:</Text>
                    <ScrollView style={styles.scrollViewStyle}>
                        <View style={styles.subclassContainer}>
                            <View style={styles.subclassColumn}>
                                <RadioButton.Group
                                    onValueChange={handleSubclassChange}
                                    value={selectedSubclass}
                                >
                                    <RadioButton.Item labelStyle={{ color: 'white' }} label="Abjuration" value="Abjuration" />
                                    <RadioButton.Item labelStyle={{ color: 'white' }} label="Divination" value="Divination" />
                                    <RadioButton.Item labelStyle={{ color: 'white' }} label="Evocation" value="Evocation" />
                                    <RadioButton.Item labelStyle={{ color: 'white' }} label="Illusion" value="Illusion" />
                                </RadioButton.Group>
                            </View>
                            <View style={styles.subclassColumn}>
                                <RadioButton.Group
                                    onValueChange={handleSubclassChange}
                                    value={selectedSubclass}
                                >
                                    <RadioButton.Item labelStyle={{ color: 'white' }} label="Conjuration" value="Conjuration" />
                                    <RadioButton.Item labelStyle={{ color: 'white' }} label="Enchantment" value="Enchantment" />
                                    <RadioButton.Item labelStyle={{ color: 'white' }} label="Necromancy" value="Necromancy" />
                                    <RadioButton.Item labelStyle={{ color: 'white' }} label="Transmutation" value="Transmutation" />
                                </RadioButton.Group>
                            </View>
                        </View>
                        
                    </ScrollView>
                    
                </View>
            );
        }
        else 
        {
            return null;
        }
    };

    const renderRaceSection = () => {
        if (selectedOption === 'race') {
            return (
                <View style={styles.raceContainer}>
                    <View style={styles.raceColumn}>
                        <RadioButton.Group
                            onValueChange={handleRaceChange}
                            value={selectedRace}
                        >
                            <RadioButton.Item labelStyle={{ color: 'white' }} label="Elf" value="Elf" />
                            <RadioButton.Item labelStyle={{ color: 'white' }} label="Half-Elf" value="Half-Elf" />
                            <RadioButton.Item labelStyle={{ color: 'white' }} label="Human" value="Human" />
                            <RadioButton.Item labelStyle={{ color: 'white' }} label="Drow" value="Drow" />
                            <RadioButton.Item labelStyle={{ color: 'white' }} label="Tiefling" value="Tiefling" />
                        </RadioButton.Group>
                    </View>
                    <View style={styles.raceColumn}>
                        <RadioButton.Group
                            onValueChange={handleRaceChange}
                            value={selectedRace}
                        >
                            <RadioButton.Item labelStyle={{ color: 'white' }} label="Half-Orc" value="Half-Orc" />
                            <RadioButton.Item labelStyle={{ color: 'white' }} label="Githyanki" value="Githyanki" />
                            <RadioButton.Item labelStyle={{ color: 'white' }} label="Gnome" value="Gnome" />
                            <RadioButton.Item labelStyle={{ color: 'white' }} label="Halfling" value="Halfling" />
                            <RadioButton.Item labelStyle={{ color: 'white' }} label="Dwarf" value="Dwarf" />
                        </RadioButton.Group>
                    </View>
                </View>
            );
        }else {
            return null;
        }
    }

    const renderSubraceSection = () => {
        if (selectedRace === 'Elf' && selectedOption === 'race') {
            return (
                <View style={styles.sectionContainerStyle}>
                <Text style={styles.sectionTitleStyle}>Choose Subrace:</Text>
                <ScrollView style={styles.scrollViewStyle}>
                    <RadioButton.Group
                        onValueChange={handleSubraceChange}
                        value={selectedSubrace}
                    >
                        <RadioButton.Item labelStyle={{ color: 'white' }} label="High" value="High" />
                        <RadioButton.Item labelStyle={{ color: 'white' }} label="Wood" value="Wood" />
                    </RadioButton.Group>
                </ScrollView>
                
            </View>
            );
        } 
        else if (selectedRace === 'Half-Elf' && selectedOption === 'race') {
            return (
                <View style={styles.sectionContainerStyle}>
                <Text style={styles.sectionTitleStyle}>Choose Subrace:</Text>
                <ScrollView style={styles.scrollViewStyle}>
                        <RadioButton.Group
                            onValueChange={handleSubraceChange}
                            value={selectedSubrace}
                        >
                            <RadioButton.Item labelStyle={{ color: 'white' }} label="High" value="High" />
                            <RadioButton.Item labelStyle={{ color: 'white' }} label="Wood" value="Wood" />
                            <RadioButton.Item labelStyle={{ color: 'white' }} label="Drow" value="Drow" />
                        </RadioButton.Group>
                    </ScrollView>
                </View>
            );
        }
        else if (selectedRace === 'Dwarf' && selectedOption === 'race') {
            return (
                <View style={styles.sectionContainerStyle}>
                <Text style={styles.sectionTitleStyle}>Choose Subrace:</Text>
                <ScrollView style={styles.scrollViewStyle}>
                        <RadioButton.Group
                            onValueChange={handleSubraceChange}
                            value={selectedSubrace}
                        >
                            <RadioButton.Item labelStyle={{ color: 'white' }} label="Hill" value="Hill" />
                            <RadioButton.Item labelStyle={{ color: 'white' }} label="Mountain" value="Mountain" />
                            <RadioButton.Item labelStyle={{ color: 'white' }} label="Duergar" value="Duergar" />
                        </RadioButton.Group>
                    </ScrollView>
                    
                </View>
            );
        }
        else if (selectedRace === 'Drow' && selectedOption === 'race') {
            return (
                <View style={styles.sectionContainerStyle}>
                <Text style={styles.sectionTitleStyle}>Choose Subrace:</Text>
                <ScrollView style={styles.scrollViewStyle}>
                        <RadioButton.Group
                            onValueChange={handleSubraceChange}
                            value={selectedSubrace}
                        >
                            <RadioButton.Item labelStyle={{ color: 'white' }} label="Seldarine" value="Seldarine" />
                            <RadioButton.Item labelStyle={{ color: 'white' }} label="Lolth" value="Lolth" />
                        </RadioButton.Group>
                    </ScrollView>
                    
                </View>
            );
        }
        else if (selectedRace === 'Tiefling' && selectedOption === 'race') {
            return (
                <View style={styles.sectionContainerStyle}>
                <Text style={styles.sectionTitleStyle}>Choose Subrace:</Text>
                <ScrollView style={styles.scrollViewStyle}>
                        <RadioButton.Group
                            onValueChange={handleSubraceChange}
                            value={selectedSubrace}
                        >
                            <RadioButton.Item labelStyle={{ color: 'white' }} label="Asmodeus" value="Asmodeus" />
                            <RadioButton.Item labelStyle={{ color: 'white' }} label="Mephistopheles" value="Mephistopheles" />
                            <RadioButton.Item labelStyle={{ color: 'white' }} label="Zariel" value="Zariel" />
                        </RadioButton.Group>
                    </ScrollView>
                    
                </View>
            );
        }
        else if (selectedRace === 'Gnome' && selectedOption === 'race') {
            return (
                <View style={styles.sectionContainerStyle}>
                <Text style={styles.sectionTitleStyle}>Choose Subrace:</Text>
                <ScrollView style={styles.scrollViewStyle}>
                        <RadioButton.Group
                            onValueChange={handleSubraceChange}
                            value={selectedSubrace}
                        >
                            <RadioButton.Item labelStyle={{ color: 'white' }} label="Rock" value="Rock" />
                            <RadioButton.Item labelStyle={{ color: 'white' }} label="Deep" value="Deep" />
                            <RadioButton.Item labelStyle={{ color: 'white' }} label="Forest" value="Forest" />
                        </RadioButton.Group>
                    </ScrollView>
                    
                </View>
            );
        }
        else if (selectedRace === 'Halfling' && selectedOption === 'race') {
            return (
                <View style={styles.sectionContainerStyle}>
                <Text style={styles.sectionTitleStyle}>Choose Subrace:</Text>
                <ScrollView style={styles.scrollViewStyle}>
                        <RadioButton.Group
                            onValueChange={handleSubraceChange}
                            value={selectedSubrace}
                        >
                            <RadioButton.Item labelStyle={{ color: 'white' }} label="Lightfoot" value="Lightfoot" />
                            <RadioButton.Item labelStyle={{ color: 'white' }} label="Strongheart" value="Strongheart" />
                        </RadioButton.Group>
                    </ScrollView>
                    
                </View>
            );
        }
        else 
        {
            return null;
        }
    };
    
    const createCharacter = async () => {
        
        if (!character.name || !character.race || !character.subclass || !character.mclass || !character.background) {
            alert('Please select all required options before confirming.');
            return;
        }

        let existingCharacters = await AsyncStorage.getItem('characters');
        existingCharacters = existingCharacters ? JSON.parse(existingCharacters) : [];

        const isDuplicate = existingCharacters.some((existingCharacter: { id: string; }) => existingCharacter.id === character.name);

        if (isDuplicate) {
            alert('A character with the same name already exists. Please choose a different name.');
            return;
        }

        const newCharacter = {
            id: character.name,
            name: character.name,
            race: character.race,
            subrace: character.subrace,
            mclass: character.mclass,
            subclass: character.subclass,
            background: character.background,
        };

        existingCharacters.push(newCharacter);

        try {
            await AsyncStorage.setItem('characters', JSON.stringify(existingCharacters));
            alert('Character Created');
            console.log('Character Stuff:', newCharacter);
            
        } catch (error) {
            console.error('Error saving character data:', error);
        }
    
        navigation.navigate('CharViewerStack', { 
            screen: "CharViewer",
            params: { character: newCharacter }
        });
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
            onPress={createCharacter}
            style={styles.confirmButton}
            >
            <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>

            <TextInput
                placeholder="Enter Character Name"
                value={character.name}
                onChangeText={handleNameChange}
                style={styles.input}
            />

            <Picker
                selectedValue={selectedOption}
                onValueChange={handleDropdownChange}
                style={styles.dropdown}
            >
                <Picker.Item label="Race" value="race" />
                <Picker.Item label="Class" value="class" />
                <Picker.Item label="Background" value="background" />
            </Picker>

            {renderRaceSection()} 
            {renderSubraceSection()}
            {renderClassSection()}
            {renderSubClassSection()}
            {renderBackgroundSection()}
            

            {selectedOption && customizationSections[selectedOption]}
        </View>
    );
}

const styles = StyleSheet.create({
    raceContainer: {
    flexDirection: 'row',
    },
    raceColumn: {
    flex: 1,
    color: 'white',
    },
    subraceColumn: {
    flex: 1,
    color: 'white',
    },
    subraceContainer: {
    flex: 1,
    },
    classContainer: {
    flexDirection: 'row',
    },
    classColumn: {
    flex: 1,
    color: 'white',
    },
    subclassColumn: {
    flex: 1,
    color: 'white',
    },
    subclassContainer: {
    flexDirection: 'row',
    },
    container: {
    flex: 1,
    backgroundColor: "black",
    padding: 16,
    },
    confirmButton: {
    backgroundColor: "red",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
    },
    buttonText: {
    color: "white",
    fontSize: 18,
    },
    input: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    },
    dropdown: {
    backgroundColor: "gray",
    color: "white",
    borderRadius: 8,
    height: 150,
    },
    sectionContainer: {
    backgroundColor: "black",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    },
    sectionTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    },
    radioButtonLabel: {
    color: "white",
    fontSize: 14,
    marginBottom: 4,
    },
    sectionContainerStyle: {
        backgroundColor: 'black',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
    },
    sectionTitleStyle: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    radioButtonLabelStyle: {
        color: 'white',
        fontSize: 14,
        marginBottom: 4,
    },
    scrollViewStyle: {
        marginBottom: 16,
        flexGrow: 1,
    }
  });