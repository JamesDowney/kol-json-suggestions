Object.assign(globalThis, require("kolmafia"));

function haveThing(thing) {
    const type = thing.type;
    const name = thing.name;
    switch (type) {
        case "familiar":
            return haveFamiliar(Familiar.get(name));
        case "item":
            return availableAmount(Item.get(name)) > 0 || storageAmount(Item.get(name)) > 0;
        case "location":
            return canAdventure(Location.get(name));
        case "skill":
            return haveSkill(Skill.get(name));
        case "locketMonster":
            return getLocketMonsters().hasOwnProperty(name);
		case "poolProperty":
            return toInt(getProperty("poolSharkCount")) >= 25;
		case "cbbRecipe":
            return !toBoolean(getProperty(`unknownRecipe${toInt(Item.get(thing))}`))
    }
}

module.exports.main = (args) => {
    const splitArgs = args === undefined ? "" : args.toLowerCase().split(" ");
    if (splitArgs.includes("help")) {
        return printHtml("Commands:<br>all - returns all suggestions<br>verbose - returns usage<br>standard - returns only things currently in standard<br>(good/okay) - returns all suggestions that are at least (good/okay)")
    }
    const showAll = splitArgs.includes("all");
    const verbose = splitArgs.includes("verbose");
	const onlyStandard = splitArgs.includes("standard");
    const filterLevel = splitArgs.includes("good")
        ? 3
        : splitArgs.includes("okay")
        ? 2
        : 1;
    const value = new Map([
		["required", 4],
        ["good", 3],
        ["okay", 2],
        ["marginal", 1],
    ]);

    const suggestions = JSON.parse(fileToBuffer("./suggestions.json"));
    suggestions
        .sort((a, b) => value.get(b.value) - value.get(a.value))
        .filter((thing) => value.get(thing.value) >= filterLevel)
        .filter((thing) =>
            showAll
                ? true
                : thing.hasOwnProperty("prereq")
                ? haveThing(thing.prereq)
                : false
        )
        .filter((thing) => !haveThing(thing) || showAll)
		.filter((thing) => onlyStandard ? isUnrestricted(thing.name) : true)
        .forEach((thing) =>
            print(`${thing.display} (${thing.value})${verbose ? " " + thing.use : ""}`, haveThing(thing) ? `blue` : `red`)
        );
};
