export const CriticalCalculation = async (
  damage: number,
  critChance: Boolean,
) => {
  try {
    if (critChance) {
      const critMultiplier = critChance ? 1.5 : 1.0;
      const critDamage = Math.floor(damage * critMultiplier);
      return critDamage;
    }
    return damage;
  } catch (error) {
    console.error("Error fetching critcal damage:", error);
  }
};
