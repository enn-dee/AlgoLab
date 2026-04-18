// import mongoose from "mongoose";

// const algorithmSchema = new mongoose.Schema({
//   slug: String,
//   title: String,
//   category: String,

//   theory: {
//     description: String,
//     timeComplexity: String,
//     spaceComplexity: String
//   },

//   input: {
//     array: [Number],
//     target: Number
//   },

//   animationSteps: Array,
//   flowchart: Object,

//   code: {
//     javascript: String
//   },

//   verified: {
//     type: Boolean,
//     default: false
//   }
// });

// export default mongoose.model("Algorithm", algorithmSchema);


import mongoose from "mongoose";

const algorithmSchema = new mongoose.Schema({
  slug: { type: String, unique: true },

  title: String,
  category: String,

  sections: {
    type: [
      {
        id: String,
        title: String,
        order: Number
      }
    ],
    default: []
  },
  pseudocode: { lines: [String] },
  currentSection: String,
  keyPoints: [String],
  theory: {
    description: String,
    timeComplexity: String,
    spaceComplexity: String
  },
  pros: [String],
  cons: [String],
  input: {
    array: [Number],
    target: Number
  },

  animationSteps: [mongoose.Schema.Types.Mixed],

  // flowchart: {
  //   nodes: [mongoose.Schema.Types.Mixed],
  //   edges: [mongoose.Schema.Types.Mixed]
  // },

  flowChartData: {
    rawNodes: [mongoose.Schema.Types.Mixed],
    rawEdges: [mongoose.Schema.Types.Mixed]
  },
  code: {
    javascript: String
  },

  verified: {
    type: Boolean,
    default: false
  }
});

const Algorithm =
  mongoose.models.Algorithm ||
  mongoose.model("Algorithm", algorithmSchema);

export default Algorithm;