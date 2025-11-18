import { Character } from '@/types/character';

export const testCharacters: Character[] = [
    { id: 1, name: "Theren Nightwhisper", level: 3, experience_points: 345, alignment: "Chaotic Good" , background: "Folk Hero", user_id: 1, character_class_id: "wizard", race_id: "half-elf", subclass_id: "evocation", subrace_id: "", languages: [ "common", "elvish" ]},
    { id: 2, name: "Mira Stormhaven", level: 8, experience_points: 853, alignment: "Lawful Neutral" , background: "Acolyte", user_id: 1, character_class_id: "fighter", race_id: "halfling", subclass_id: "champion", subrace_id: "lightfoot-halfling", languages: [ "common", "halfling" ]},
    { id: 3, name: "Kaelynn Thornwick", level: 1, experience_points: 121, alignment: "Neutral Good" , background: "Hermit", user_id: 2, character_class_id: "druid", race_id: "gnome", subclass_id: "", subrace_id: "rock-gnome", languages: [ "common", "gnomish" ]}
]