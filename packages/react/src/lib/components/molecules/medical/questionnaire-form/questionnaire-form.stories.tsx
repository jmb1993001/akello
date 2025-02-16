const phq9 = {
  "resourceType": "Questionnaire",
  "id": "PHQ9",
  "meta": {
    "profile": [
      "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire|3.0.0"
    ]
  },  
  "contained": [
    {
      "resourceType": "ValueSet",
      "id": "VSPHQ9",
      "meta": {
        "profile": [
          "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-valueset"
        ]
      },
      "url": "http://hl7.org/fhir/uv/sdc/ValueSet/VSPHQ9",
      "name": "VSPHQ9",
      "status": "draft",
      "description": "The answer list for questions addressing the frequency in which patient reports experiencing behaviors that are assessed in the PHQ-9 Questionnaire.",
      "immutable": true,
      "compose": {
        "include": [
          {
            "system": "http://hl7.org/fhir/uv/sdc/CodeSystem/CSPHQ9",
            "concept": [
              {
                "extension": [
                  {
                    "url": "http://hl7.org/fhir/StructureDefinition/ordinalValue",
                    "valueDecimal": 0
                  }
                ],
                "code": "Not-at-all",
                "display": "Not at all"
              },
              {
                "extension": [
                  {
                    "url": "http://hl7.org/fhir/StructureDefinition/ordinalValue",
                    "valueDecimal": 1
                  }
                ],
                "code": "Several-days",
                "display": "Several days"
              },
              {
                "extension": [
                  {
                    "url": "http://hl7.org/fhir/StructureDefinition/ordinalValue",
                    "valueDecimal": 2
                  }
                ],
                "code": "More than half the days",
                "display": "More than half the days"
              },
              {
                "extension": [
                  {
                    "url": "http://hl7.org/fhir/StructureDefinition/ordinalValue",
                    "valueDecimal": 3
                  }
                ],
                "code": "Nearly every day",
                "display": "Nearly every day"
              }
            ]
          }
        ]
      }
    }
  ],
  "extension": [
    {
      "url": "http://hl7.org/fhir/StructureDefinition/rendering-styleSensitive",
      "valueBoolean": true
    }
  ],
  "url": "http://hl7.org/fhir/uv/sdc/Questionnaire/questionnaire-sdc-profile-example-PHQ9",
  "version": "3.0.0",
  "name": "SDCPHQ9",
  "title": "Patient Health Questionnaire - 9 Item",
  "status": "draft",
  "experimental": true,
  "subjectType": [
    "Patient"
  ],
  "date": "2022-03-08T18:33:14+00:00",
  "publisher": "HL7 International - FHIR Infrastructure Work Group",
  "contact": [
    {
      "telecom": [
        {
          "system": "url",
          "value": "http://hl7.org/Special/committees/fiwg"
        }
      ]
    }
  ],
  "description": "This is a Questionnaire example of how the PHQ-9 Questionnaire could be rendered as a FHIR Questionnaire Resource according to the Structured Data Capture SDC Base Questionnaire Profile. This example also portrays how FHIRpaths can be used to perform total score calculations using answer values.",
  "jurisdiction": [
    {
      "coding": [
        {
          "system": "http://unstats.un.org/unsd/methods/m49/m49.htm",
          "code": "001"
        }
      ]
    }
  ],
  "purpose": "This Questionnaire example was generated to ensure a non-proprietary, publicly available questionnaire that is available to test the Structured Data Capture profiles",
  "copyright": "This content is an unaltered digital reproduction of the PHQ-9 which is copyrighted by Pfizer Inc., which states that no permission is required to reproduce, translate, display or distribute the PHQ-9.",
  "approvalDate": "2019-08-20",
  "effectivePeriod": {
    "start": "2018-08-20T04:00:00.000Z",
    "end": "2020-08-20T04:00:00.000Z"
  },
  "item": [
    {
      "linkId": "H1/T1",
      "text": "Over the last two weeks, how often have you been bothered by any of the following problems?",
      "type": "group",
      "item": [
        {
          "linkId": "H1/T1/Q1",
          "text": "Little interest or pleasure in doing things?",
          "type": "choice",
          "answerValueSet": "#VSPHQ9"
        },
        {
          "linkId": "H1/T1/Q2",
          "text": "Feeling down, depressed, or hopeless?",
          "type": "choice",
          "answerValueSet": "#VSPHQ9"
        },
        {
          "linkId": "H1/T1/Q3",
          "text": "Trouble falling or staying asleep, or sleeping too much?",
          "type": "choice",
          "answerValueSet": "#VSPHQ9"
        },
        {
          "linkId": "H1/T1/Q4",
          "text": "Feeling tired or having little energy?",
          "type": "choice",
          "answerValueSet": "#VSPHQ9"
        },
        {
          "linkId": "H1/T1/Q5",
          "text": "Poor appetite or overeating?",
          "type": "choice",
          "answerValueSet": "#VSPHQ9"
        },
        {
          "linkId": "H1/T1/Q6",
          "text": "Feeling bad about yourself - or that you are a failure or have let yourself or your family down?",
          "type": "choice",
          "answerValueSet": "#VSPHQ9"
        },
        {
          "linkId": "H1/T1/Q7",
          "text": "Trouble concentrating on things, such as reading the newspaper or watching television?",
          "type": "choice",
          "answerValueSet": "#VSPHQ9"
        },
        {
          "linkId": "H1/T1/Q8",
          "text": "Moving or speaking so slowly that other people could gave noticed? Or so fidgety or restless that you have been moving a lot more than usual?",
          "type": "choice",
          "answerValueSet": "#VSPHQ9"
        },
        {
          "linkId": "H1/T1/Q9",
          "text": "Thoughts that you would be better off dead, or thoughts of hurting yourself in some way?",
          "type": "choice",
          "answerValueSet": "#VSPHQ9"
        },
        {
          "extension": [
            {
              "url": "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-calculatedExpression",
              "valueExpression": {
                "description": "Score (0-4: None-minimal; 5-9: Mild; 19-14: Moderate; 15-19: Moderately severe; 20-27: Severe)",
                "name": "score",
                "language": "text/fhirpath",
                "expression": "%resource.answers().value.ordinal().sum()"
              }
            }
          ],
          "linkId": "H1/TS",
          "code": [
            {
              "system": "http://loinc.org",
              "code": "44261-6",
              "display": "Patient Health Questionnaire 9 item (PHQ-9) total score [Reported]"
            }
          ],
          "text": "Patient health questionnaire 9 item total score",
          "type": "quantity"
        }
      ]
    }
  ]
}








const gad7 = {
  "resourceType": "Questionnaire",
  "id": "GAD7",
  "meta": {
    "profile": [
      "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire|3.0.0"
    ]
  },  
  "contained": [
    {
      "resourceType": "ValueSet",
      "id": "VSPHQ9",
      "meta": {
        "profile": [
          "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-valueset"
        ]
      },
      "url": "http://hl7.org/fhir/uv/sdc/ValueSet/VSGAD7",
      "name": "VSGAD7",
      "status": "draft",
      "description": "The answer list for questions addressing the frequency in which patient reports experiencing behaviors that are assessed in the PHQ-9 Questionnaire.",
      "immutable": true,
      "compose": {
        "include": [
          {
            "system": "http://hl7.org/fhir/uv/sdc/CodeSystem/VSGAD7",
            "concept": [
              {
                "extension": [
                  {
                    "url": "http://hl7.org/fhir/StructureDefinition/ordinalValue",
                    "valueDecimal": 0
                  }
                ],
                "code": "Not-at-all",
                "display": "Not at all"
              },
              {
                "extension": [
                  {
                    "url": "http://hl7.org/fhir/StructureDefinition/ordinalValue",
                    "valueDecimal": 1
                  }
                ],
                "code": "Several-days",
                "display": "Several days"
              },
              {
                "extension": [
                  {
                    "url": "http://hl7.org/fhir/StructureDefinition/ordinalValue",
                    "valueDecimal": 2
                  }
                ],
                "code": "More than half the days",
                "display": "More than half the days"
              },
              {
                "extension": [
                  {
                    "url": "http://hl7.org/fhir/StructureDefinition/ordinalValue",
                    "valueDecimal": 3
                  }
                ],
                "code": "Nearly every day",
                "display": "Nearly every day"
              }
            ]
          }
        ]
      }
    }
  ],
  "extension": [
    {
      "url": "http://hl7.org/fhir/StructureDefinition/rendering-styleSensitive",
      "valueBoolean": true
    }
  ],
  "url": "http://hl7.org/fhir/uv/sdc/Questionnaire/questionnaire-sdc-profile-example-PHQ9",
  "version": "3.0.0",
  "name": "SDCPHQ9",
  "title": "Patient Health Questionnaire - 9 Item",
  "status": "draft",
  "experimental": true,
  "subjectType": [
    "Patient"
  ],
  "date": "2022-03-08T18:33:14+00:00",
  "publisher": "HL7 International - FHIR Infrastructure Work Group",
  "contact": [
    {
      "telecom": [
        {
          "system": "url",
          "value": "http://hl7.org/Special/committees/fiwg"
        }
      ]
    }
  ],
  "description": "This is a Questionnaire example of how the PHQ-9 Questionnaire could be rendered as a FHIR Questionnaire Resource according to the Structured Data Capture SDC Base Questionnaire Profile. This example also portrays how FHIRpaths can be used to perform total score calculations using answer values.",
  "jurisdiction": [
    {
      "coding": [
        {
          "system": "http://unstats.un.org/unsd/methods/m49/m49.htm",
          "code": "001"
        }
      ]
    }
  ],
  "purpose": "This Questionnaire example was generated to ensure a non-proprietary, publicly available questionnaire that is available to test the Structured Data Capture profiles",
  "copyright": "This content is an unaltered digital reproduction of the PHQ-9 which is copyrighted by Pfizer Inc., which states that no permission is required to reproduce, translate, display or distribute the PHQ-9.",
  "approvalDate": "2019-08-20",
  "effectivePeriod": {
    "start": "2018-08-20T04:00:00.000Z",
    "end": "2020-08-20T04:00:00.000Z"
  },
  "item": [
    {
      "linkId": "H1/T1",
      "text": "Over the last two weeks, how often have you been bothered by any of the following problems?",
      "type": "group",
      "item": [
        {
          "linkId": "H1/T1/Q1",
          "text": "Feeling nervous, anxious, or on edge",
          "type": "choice",
          "answerValueSet": "#VSGAD7"
        },
        {
          "linkId": "H1/T1/Q2",
          "text": "Not being able to stop or control worrying",
          "type": "choice",
          "answerValueSet": "#VSGAD7"
        },
        {
          "linkId": "H1/T1/Q3",
          "text": "Worrying too much about different things",
          "type": "choice",
          "answerValueSet": "#VSGAD7"
        },
        {
          "linkId": "H1/T1/Q4",
          "text": "Trouble relaxing",
          "type": "choice",
          "answerValueSet": "#VSGAD7"
        },
        {
          "linkId": "H1/T1/Q5",
          "text": "Being so restless that it is hard to sit still",
          "type": "choice",
          "answerValueSet": "#VSGAD7"
        },
        {
          "linkId": "H1/T1/Q6",
          "text": "Becoming easily annoyed or irritable",
          "type": "choice",
          "answerValueSet": "#VSGAD7"
        },
        {
          "linkId": "H1/T1/Q7",
          "text": "Feeling afraid, as if something awful might happen ",
          "type": "choice",
          "answerValueSet": "#VSGAD7"
        },        
        {
          "extension": [
            {
              "url": "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-calculatedExpression",
              "valueExpression": {
                "description": "Score (0-4: Minimal Anxiety; 5-9: Mild Anxiety; 10-14: Moderate Anxiety; 15+: Severe)",
                "name": "score",
                "language": "text/fhirpath",
                "expression": "%resource.answers().value.ordinal().sum()"
              }
            }
          ],
          "linkId": "H1/TS",
          "code": [
            {
              "system": "http://loinc.org",
              "code": "70274-6",
              "display": "Generalized anxiety disorder 7 item (GAD-7) total score [Reported.PHQ]"
            }
          ],
          "text": "Generalized anxiety disorder 7 item (GAD-7) total score",
          "type": "quantity"
        }
      ]
    }
  ]
}

import React from 'react'
import { QuestionnaireForm, QuestionnaireFormProps } from '.'
import { objectValuesToControls } from '../../../../storybook-utils'
import { Meta } from '@storybook/react'
import { StoryFn } from '@storybook/react'
import { MantineProvider} from '@mantine/core';


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof QuestionnaireForm> = {
  title: 'Atoms/QuestionnaireForm',
  component: QuestionnaireForm,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    questionnaire: phq9
  },
}
export default meta

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof QuestionnaireForm> = (args: QuestionnaireFormProps) => (
  <MantineProvider>
    <QuestionnaireForm {...args} />
  </MantineProvider>
)

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  questionnaire: gad7
}
