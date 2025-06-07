import { loadPlayers, savePlayers } from '../backend/data/players.js';

export default function handler(req, res) {
    const { id, itemId } = req.query;
    const characters = loadPlayers();

    if (req.method === 'PATCH') {
        const index = characters.findIndex(c => c.id === id);
        if (index === -1) return res.status(404).json({ error: 'Character not found' });
        const character = characters[index];

        const {
            hp,
            ap,
            currency,
            strength,
            perception,
            endurance,
            charisma,
            intelligence,
            agility,
            luck,
        } = req.body;

        // Validace hodnot
        if (hp !== undefined && (hp < 0 || hp > 100)) {
            return res.status(400).json({ error: 'HP must be between 0 and 100' });
        }
        if (ap !== undefined && (ap < 0 || ap > 100)) {
            return res.status(400).json({ error: 'AP must be between 0 and 100' });
        }
        if (currency !== undefined && currency < 0) {
            return res.status(400).json({ error: 'Currency cannot be negative' });
        }

        const validateStat = (value) => value >= 1 && value <= 10;
        if (strength !== undefined && !validateStat(strength)) {
            return res.status(400).json({ error: 'Strength must be between 1 and 10' });
        }
        if (perception !== undefined && !validateStat(perception)) {
            return res.status(400).json({ error: 'Perception must be between 1 and 10' });
        }
        if (endurance !== undefined && !validateStat(endurance)) {
            return res.status(400).json({ error: 'Endurance must be between 1 and 10' });
        }
        if (charisma !== undefined && !validateStat(charisma)) {
            return res.status(400).json({ error: 'Charisma must be between 1 and 10' });
        }
        if (intelligence !== undefined && !validateStat(intelligence)) {
            return res.status(400).json({ error: 'Intelligence must be between 1 and 10' });
        }
        if (agility !== undefined && !validateStat(agility)) {
            return res.status(400).json({ error: 'Agility must be between 1 and 10' });
        }
        if (luck !== undefined && !validateStat(luck)) {
            return res.status(400).json({ error: 'Luck must be between 1 and 10' });
        }

        // Aktualizace atributů
        if (hp !== undefined) character.hp = hp;
        if (ap !== undefined) character.ap = ap;
        if (currency !== undefined) character.currency = currency;
        if (strength !== undefined) character.strength = strength;
        if (perception !== undefined) character.perception = perception;
        if (endurance !== undefined) character.endurance = endurance;
        if (charisma !== undefined) character.charisma = charisma;
        if (intelligence !== undefined) character.intelligence = intelligence;
        if (agility !== undefined) character.agility = agility;
        if (luck !== undefined) character.luck = luck;

        savePlayers(characters);

        return res.status(200).json(character);
    }

    if (req.method === 'POST') {
        const character = characters.find(c => c.id === id);
        if (!character) return res.status(404).json({ error: 'Character not found' });

        const { item } = req.body;
        if (!item) return res.status(400).json({ error: 'Item is required' });

        // Přidání předmětu do inventáře
        character.inventory.push(item);
        savePlayers(characters);
        return res.status(200).json(character);
    }

    if (req.method === 'DELETE') {
        const character = characters.find(c => c.id === id);
        if (!character) return res.status(404).json({ error: 'Character not found' });

        // Odebrání předmětu z inventáře
        character.inventory = character.inventory.filter((_, index) => index != itemId);
        savePlayers(characters);
        return res.status(200).json(character);
    }

    res.setHeader('Allow', ['PATCH', 'POST', 'DELETE']);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
}
