/**
 * Copyright (c) 2006-2015, JGraph Ltd
 * Copyright (c) 2006-2015, Gaudenz Alder
 */
var mxStyleRegistry =
  {
    /**
     * Class: mxStyleRegistry
     *
     * Singleton class that acts as a global converter from string to object values
     * in a style. This is currently only used to perimeters and edge styles.
     *
     * Variable: values
     *
     * Maps from strings to objects.
     */
    values: [],

    /**
     * Function: putValue
     *
     * Puts the given object into the registry under the given name.
     */
    putValue: function (name, obj) {
      mxStyleRegistry.values[name] = obj
    },

    /**
     * Function: getValue
     *
     * Returns the value associated with the given name.
     */
    getValue: function (name) {
      return mxStyleRegistry.values[name]
    },

    /**
     * Function: getName
     *
     * Returns the name for the given value.
     */
    getName: function (value) {
      for (var key in mxStyleRegistry.values) {
        if (mxStyleRegistry.values[key] == value) {
          return key
        }
      }

      return null
    }

  }

export default mxStyleRegistry