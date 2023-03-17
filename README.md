# AutoscendSuggestions
[Autoscend](https://github.com/Loathing-Associates-Scripting-Society/autoscend) is a complex script and has many nuances. Goal of this script is to help folks identify if they are missing some of those hard to find configurations/settings. For example, if you have Combat Lover's Locket do you have all the monsters autoscend will reminice in your locket?

## Installing script

To install, run the following command on an up-to-date [KolMafia](https://github.com/kolmafia/kolmafia) version:

```
git checkout JamesDowney/kol-json-suggestions
```

To update, run `git update` or check the "Update installed Git projects on login" box within Mafia preferences.

## Running script

Run script in aftercore to ensure everything you have is properly tracked.

Run the following command in the mafia GCLI:

`autoscendSuggestions`

This will display your missing skills/items/other. To view what you have as well, run the following command:

`autoscendSuggestions all`

Red are those you don't have. Blue are what you have.

To see which ones you are missing and why they are helpful, run the following:

`autoscendSuggestions verbose`

Finally, there is a help command:

`autoscendSuggestions help`
