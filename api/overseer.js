import { getPlayerById, updatePlayer, addItem, removeItem } from '../backend/data/db.js';

export default async function handler(req, res) {
    const { id, itemId } = req.query;

    if (req.method === 'PATCH') {
        const character = await getPlayerById(id);
        if (!character) return res.status(404).json({ error: 'Character not found' });

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

        const updated = await updatePlayer(id, {
            ...(hp !== undefined && { hp }),
            ...(ap !== undefined && { ap }),
            ...(currency !== undefined && { currency }),
            ...(strength !== undefined && { strength }),
            ...(perception !== undefined && { perception }),
            ...(endurance !== undefined && { endurance }),
            ...(charisma !== undefined && { charisma }),
            ...(intelligence !== undefined && { intelligence }),
            ...(agility !== undefined && { agility }),
            ...(luck !== undefined && { luck }),
        });

        return res.status(200).json(updated);
    }

    if (req.method === 'POST') {
        const { item } = req.body;
        if (!item) return res.status(400).json({ error: 'Item is required' });

        const updated = await addItem(id, item);
        if (!updated) return res.status(404).json({ error: 'Character not found' });
        return res.status(200).json(updated);
    }

    if (req.method === 'DELETE') {
        const updated = await removeItem(id, itemId);
        if (!updated) return res.status(404).json({ error: 'Character not found' });
        return res.status(200).json(updated);
    }

    res.setHeader('Allow', ['PATCH', 'POST', 'DELETE']);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
}
