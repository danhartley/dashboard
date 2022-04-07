import { rest } from 'msw'

export const handlers = [  
    rest.get('snapshots.json', async (req, res, ctx) => {
        return res(
            ctx.json(
                [
                    {
                        "id": 1,
                        "source": "Trustworthy AI",
                        "snapshot": "23 Jan 2022",
                        "items": [{
                                "id": 1,
                                "name": "Human agency and oversight",
                                "value": "Responsibility",
                                "honoured": 1,
                                "broken": 2,
                                "pledges": [{
                                        "name": "We pledge to evaluate risk, so that fundamental rights are not negatively affected.",
                                        "honoured": 1,
                                        "broken": 0
                                    },
                                    {
                                        "name": "We pledge to enable human agency, so that users retain autonomy.",
                                        "honoured": 0,
                                        "broken": 1
                                    },
                                    {
                                        "name": "We pledge that there will be human oversight, so that human values are upheld.",
                                        "honoured": 0,
                                        "broken": 1
                                    }
                                ]
                            },
                            {
                                "id": 2,
                                "name": "Technical robustness and safety",
                                "value": "Safety",
                                "honoured": 6,
                                "broken": 1,
                                "pledges": [{
                                        "name": "We pledge that our systems will be safe and secure, so that they cannot be misused by bad actors.",
                                        "honoured": 1,
                                        "broken": 0
                                    },
                                    {
                                        "name": "We pledge that our systems will be robust, so as to minimise risk and prevent harm.",
                                        "honoured": 0,
                                        "broken": 1
                                    },
                                    {
                                        "name": "We pledge that our systems will be resistant to attacks and protected against vulnerabilities, so that our systems and data are safe.",
                                        "honoured": 1,
                                        "broken": 0
                                    },
                                    {
                                        "name": "We pledge to put in place safeguards, so that the system will not be compromised in case of problems.",
                                        "honoured": 1,
                                        "broken": 0
                                    },
                                    {
                                        "name": "We pledge to consider unintended consequences and errors, so that no harm comes to living beings or the environment.",
                                        "honoured": 1,
                                        "broken": 0
                                    },
                                    {
                                        "name": "We pledge to put in place evaluation processes, so that we support, mitigate and correct unintended risks.",
                                        "honoured": 1,
                                        "broken": 0
                                    },
                                    {
                                        "name": "We pledge to demonstrate reproducible results, so that we can accurately describe the system.",
                                        "honoured": 1,
                                        "broken": 0
                                    }
                                ]
                            },
                            {
                                "id": 3,
                                "name": "Privacy and data governance",
                                "value": "Trust",
                                "broken": 2,
                                "honoured": 1,
                                "pledges": [{
                                        "name": "We guarantee privacy and data protection throughout the system’s entire lifecycle, in order to protect users",
                                        "honoured": 0,
                                        "broken": 1
                                    },
                                    {
                                        "name": "We guarantee the integrity of data, in order to enforce biases, inaccuracies, errors and mistakes.",
                                        "honoured": 0,
                                        "broken": 1
                                    },
                                    {
                                        "name": "We pledge to put in place data protocols governing data access, in order to protect individuals' data.",
                                        "honoured": 1,
                                        "broken": 0
                                    }
                                ]
                            },
                            {
                                "id": 4,
                                "name": "Transparency",
                                "value": "Transparency",
                                "broken": 0,
                                "honoured": 3,
                                "features": 1,
                                "pledges": [{
                                        "name": "We pledge to document processes leading to AI decisions, in order to identify reasons in the case of mistakes.",
                                        "honoured": 1,
                                        "broken": 0
                                    },
                                    {
                                        "name": "We pledge to make AI decisions that can be understood and traced by human beings, in order that we can explain those decisions.",
                                        "honoured": 1,
                                        "broken": 0
                                    },
                                    {
                                        "name": "We pledge to make all AI systems identifiable, in order that people can decide whether to accept any interaction.",
                                        "honoured": 1,
                                        "broken": 0
                                    }
                                ]
                            },
                            {
                                "id": 5,
                                "name": "Diversity, non-discrimination and fairness",
                                "value": "Fairness",
                                "broken": 2,
                                "honoured": 2,
                                "pledges": [{
                                        "name": "We pledge to consider and involve all affected stakeholders, to enable diversity and inclusion.",
                                        "honoured": 1,
                                        "broken": 0
                                    },
                                    {
                                        "name": "We pledge to use only data sets that are free of bias and complete, in order not to perpetuate unfairness.",
                                        "honoured": 0,
                                        "broken": 1
                                    },
                                    {
                                        "name": "We pledge to make systems accessible to as wide a range of users as possible, in order that they benefit from equitable access and participation.",
                                        "honoured": 0,
                                        "broken": 1
                                    },
                                    {
                                        "name": "We pledge to consult stakeholders, in order to develop trustworthy systems.",
                                        "honoured": 1,
                                        "broken": 0
                                    }
                                ]
                            },
                            {
                                "id": 6,
                                "name": "Environmental and societal well-being",
                                "value": "Sustainability",
                                "honoured": 4,
                                "broken": 0,
                                "pledges": [{
                                        "name": "We pledge to consider the environment a stakeholder, in order that our systems are sustainable and ecologically responsible.",
                                        "honoured": 1,
                                        "broken": 0
                                    },
                                    {
                                        "name": "We pledge to scrutinise the system's processes and supply chains, so that it is environmentally friendly.",
                                        "honoured": 1,
                                        "broken": 0
                                    },
                                    {
                                        "name": "We pledge to monitor the system's effect on society, so that we do not damage people's mental or physical wellbeing.",
                                        "honoured": 1,
                                        "broken": 0
                                    },
                                    {
                                        "name": "We pledge to monitor the system's effect on society, so that we do not damage institutions, democracy or society at large.",
                                        "honoured": 1,
                                        "broken": 0
                                    }
                                ]
                            },
                            {
                                "id": 7,
                                "name": "Accountability",
                                "value": "Accountability",
                                "honoured": 3,
                                "broken": 1,
                                "pledges": [{
                                        "name": "We pledge that all decisions will be explainable, so that they can be verified.",
                                        "honoured": 0,
                                        "broken": 1
                                    },
                                    {
                                        "name": "We pledge to make our Responsibility Dashboard public, so that we can be held accountable.",
                                        "honoured": 1,
                                        "broken": 0
                                    },
                                    {
                                        "name": "We pledge to make public our certifications, so that we can be held accountable.",
                                        "honoured": 1,
                                        "broken": 0
                                    },
                                    {
                                        "name": "We pledge to open channels of communication, so that we can be held accountable.",
                                        "honoured": 1,
                                        "broken": 0
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": 2,
                        "source": "Trustworthy AI",
                        "snapshot": "23 Feb 2022",
                        "items": [{
                                "id": 1,
                                "name": "Human agency and oversight",
                                "value": "Responsibility",
                                "honoured": 2,
                                "broken": 1,
                                "pledges": [{
                                        "name": "We pledge to evaluate risk, so that fundamental rights are not negatively affected.",
                                        "honoured": 1,
                                        "broken": 0
                                    },
                                    {
                                        "name": "We pledge to enable human agency, so that users retain autonomy.",
                                        "honoured": 1,
                                        "broken": 0
                                    },
                                    {
                                        "name": "We pledge that there will be human oversight, so that human values are upheld.",
                                        "honoured": 0,
                                        "broken": 1
                                    }
                                ]
                            },
                            {
                                "id": 2,
                                "name": "Technical robustness and safety",
                                "value": "Safety",
                                "honoured": 6,
                                "broken": 1,
                                "pledges": [{
                                        "name": "We pledge that our systems will be safe and secure, so that they cannot be misused by bad actors.",
                                        "honoured": 1,
                                        "broken": 0
                                    },
                                    {
                                        "name": "We pledge that our systems will be robust, so as to minimise risk and prevent harm.",
                                        "honoured": 0,
                                        "broken": 1
                                    },
                                    {
                                        "name": "We pledge that our systems will be resistant to attacks and protected against vulnerabilities, so that our systems and data are safe.",
                                        "honoured": 1,
                                        "broken": 0
                                    },
                                    {
                                        "name": "We pledge to put in place safeguards, so that the system will not be compromised in case of problems.",
                                        "honoured": 1,
                                        "broken": 0
                                    },
                                    {
                                        "name": "We pledge to consider unintended consequences and errors, so that no harm comes to living beings or the environment.",
                                        "honoured": 1,
                                        "broken": 0
                                    },
                                    {
                                        "name": "We pledge to put in place evaluation processes, so that we support, mitigate and correct unintended risks.",
                                        "honoured": 1,
                                        "broken": 0
                                    },
                                    {
                                        "name": "We pledge to demonstrate reproducible results, so that we can accurately describe the system.",
                                        "honoured": 1,
                                        "broken": 0
                                    }
                                ]
                            },
                            {
                                "id": 3,
                                "name": "Privacy and data governance",
                                "value": "Trust",
                                "broken": 2,
                                "honoured": 1,
                                "pledges": [{
                                        "name": "We guarantee privacy and data protection throughout the system’s entire lifecycle, in order to protect users",
                                        "honoured": 0,
                                        "broken": 1
                                    },
                                    {
                                        "name": "We guarantee the integrity of data, in order to enforce biases, inaccuracies, errors and mistakes.",
                                        "honoured": 0,
                                        "broken": 1
                                    },
                                    {
                                        "name": "We pledge to put in place data protocols governing data access, in order to protect individuals' data.",
                                        "honoured": 1,
                                        "broken": 0
                                    }
                                ]
                            },
                            {
                                "id": 4,
                                "name": "Transparency",
                                "value": "Transparency",
                                "broken": 0,
                                "honoured": 3,
                                "features": 1,
                                "pledges": [{
                                        "name": "We pledge to document processes leading to AI decisions, in order to identify reasons in the case of mistakes.",
                                        "honoured": 1,
                                        "broken": 0
                                    },
                                    {
                                        "name": "We pledge to make AI decisions that can be understood and traced by human beings, in order that we can explain those decisions.",
                                        "honoured": 1,
                                        "broken": 0
                                    },
                                    {
                                        "name": "We pledge to make all AI systems identifiable, in order that people can decide whether to accept any interaction.",
                                        "honoured": 1,
                                        "broken": 0
                                    }
                                ]
                            },
                            {
                                "id": 5,
                                "name": "Diversity, non-discrimination and fairness",
                                "value": "Fairness",
                                "broken": 2,
                                "honoured": 2,
                                "pledges": [{
                                        "name": "We pledge to consider and involve all affected stakeholders, to enable diversity and inclusion.",
                                        "honoured": 1,
                                        "broken": 0
                                    },
                                    {
                                        "name": "We pledge to use only data sets that are free of bias and complete, in order not to perpetuate unfairness.",
                                        "honoured": 0,
                                        "broken": 1
                                    },
                                    {
                                        "name": "We pledge to make systems accessible to as wide a range of users as possible, in order that they benefit from equitable access and participation.",
                                        "honoured": 0,
                                        "broken": 1
                                    },
                                    {
                                        "name": "We pledge to consult stakeholders, in order to develop trustworthy systems.",
                                        "honoured": 1,
                                        "broken": 0
                                    }
                                ]
                            },
                            {
                                "id": 6,
                                "name": "Environmental and societal well-being",
                                "value": "Sustainability",
                                "honoured": 4,
                                "broken": 0,
                                "pledges": [{
                                        "name": "We pledge to consider the environment a stakeholder, in order that our systems are sustainable and ecologically responsible.",
                                        "honoured": 1,
                                        "broken": 0
                                    },
                                    {
                                        "name": "We pledge to scrutinise the system's processes and supply chains, so that it is environmentally friendly.",
                                        "honoured": 1,
                                        "broken": 0
                                    },
                                    {
                                        "name": "We pledge to monitor the system's effect on society, so that we do not damage people's mental or physical wellbeing.",
                                        "honoured": 1,
                                        "broken": 0
                                    },
                                    {
                                        "name": "We pledge to monitor the system's effect on society, so that we do not damage institutions, democracy or society at large.",
                                        "honoured": 1,
                                        "broken": 0
                                    }
                                ]
                            },
                            {
                                "id": 7,
                                "name": "Accountability",
                                "value": "Accountability",
                                "honoured": 3,
                                "broken": 1,
                                "pledges": [{
                                        "name": "We pledge that all decisions will be explainable, so that they can be verified.",
                                        "honoured": 0,
                                        "broken": 1
                                    },
                                    {
                                        "name": "We pledge to make our Responsibility Dashboard public, so that we can be held accountable.",
                                        "honoured": 1,
                                        "broken": 0
                                    },
                                    {
                                        "name": "We pledge to make public our certifications, so that we can be held accountable.",
                                        "honoured": 1,
                                        "broken": 0
                                    },
                                    {
                                        "name": "We pledge to open channels of communication, so that we can be held accountable.",
                                        "honoured": 1,
                                        "broken": 0
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": 3,
                        "source": "Trustworthy AI",
                        "snapshot": "23 Mar 2022",
                        "items": []
                    }
                ]
            )
        )
    }),
    rest.get('snapshots.3.json', async (req, res, ctx) => {
        return res(
            ctx.json(
                [
                    {
                        "id": 3,
                        "source": "Trustworthy AI",
                        "snapshot": "23 Mar 2022",
                        "items": []
                    }
                ]
            )
        )
    }),
    rest.get('snapshots.2.json', async (req, res, ctx) => {
        return res(
            ctx.json(
                [
                    {
                        "id": 2,
                        "source": "Trustworthy AI",
                        "snapshot": "23 Feb 2022",
                        "items": [{
                                "id": 1,
                                "name": "Human agency and oversight",
                                "value": "Responsibility",
                                "honoured": 2,
                                "broken": 1,
                                "pledges": [{
                                        "name": "We pledge to evaluate risk, so that fundamental rights are not negatively affected.",
                                        "honoured": 1,
                                        "broken": 0
                                    },
                                    {
                                        "name": "We pledge to enable human agency, so that users retain autonomy.",
                                        "honoured": 1,
                                        "broken": 0
                                    },
                                    {
                                        "name": "We pledge that there will be human oversight, so that human values are upheld.",
                                        "honoured": 0,
                                        "broken": 1
                                    }
                                ]
                            },
                            {
                                "id": 2,
                                "name": "Technical robustness and safety",
                                "value": "Safety",
                                "honoured": 6,
                                "broken": 1,
                                "pledges": [{
                                        "name": "We pledge that our systems will be safe and secure, so that they cannot be misused by bad actors.",
                                        "honoured": 1,
                                        "broken": 0
                                    },
                                    {
                                        "name": "We pledge that our systems will be robust, so as to minimise risk and prevent harm.",
                                        "honoured": 0,
                                        "broken": 1
                                    },
                                    {
                                        "name": "We pledge that our systems will be resistant to attacks and protected against vulnerabilities, so that our systems and data are safe.",
                                        "honoured": 1,
                                        "broken": 0
                                    },
                                    {
                                        "name": "We pledge to put in place safeguards, so that the system will not be compromised in case of problems.",
                                        "honoured": 1,
                                        "broken": 0
                                    },
                                    {
                                        "name": "We pledge to consider unintended consequences and errors, so that no harm comes to living beings or the environment.",
                                        "honoured": 1,
                                        "broken": 0
                                    },
                                    {
                                        "name": "We pledge to put in place evaluation processes, so that we support, mitigate and correct unintended risks.",
                                        "honoured": 1,
                                        "broken": 0
                                    },
                                    {
                                        "name": "We pledge to demonstrate reproducible results, so that we can accurately describe the system.",
                                        "honoured": 1,
                                        "broken": 0
                                    }
                                ]
                            },
                            {
                                "id": 3,
                                "name": "Privacy and data governance",
                                "value": "Trust",
                                "broken": 2,
                                "honoured": 1,
                                "pledges": [{
                                        "name": "We guarantee privacy and data protection throughout the system’s entire lifecycle, in order to protect users",
                                        "honoured": 0,
                                        "broken": 1
                                    },
                                    {
                                        "name": "We guarantee the integrity of data, in order to enforce biases, inaccuracies, errors and mistakes.",
                                        "honoured": 0,
                                        "broken": 1
                                    },
                                    {
                                        "name": "We pledge to put in place data protocols governing data access, in order to protect individuals' data.",
                                        "honoured": 1,
                                        "broken": 0
                                    }
                                ]
                            },
                            {
                                "id": 4,
                                "name": "Transparency",
                                "value": "Transparency",
                                "broken": 0,
                                "honoured": 3,
                                "features": 1,
                                "pledges": [{
                                        "name": "We pledge to document processes leading to AI decisions, in order to identify reasons in the case of mistakes.",
                                        "honoured": 1,
                                        "broken": 0
                                    },
                                    {
                                        "name": "We pledge to make AI decisions that can be understood and traced by human beings, in order that we can explain those decisions.",
                                        "honoured": 1,
                                        "broken": 0
                                    },
                                    {
                                        "name": "We pledge to make all AI systems identifiable, in order that people can decide whether to accept any interaction.",
                                        "honoured": 1,
                                        "broken": 0
                                    }
                                ]
                            },
                            {
                                "id": 5,
                                "name": "Diversity, non-discrimination and fairness",
                                "value": "Fairness",
                                "broken": 2,
                                "honoured": 2,
                                "pledges": [{
                                        "name": "We pledge to consider and involve all affected stakeholders, to enable diversity and inclusion.",
                                        "honoured": 1,
                                        "broken": 0
                                    },
                                    {
                                        "name": "We pledge to use only data sets that are free of bias and complete, in order not to perpetuate unfairness.",
                                        "honoured": 0,
                                        "broken": 1
                                    },
                                    {
                                        "name": "We pledge to make systems accessible to as wide a range of users as possible, in order that they benefit from equitable access and participation.",
                                        "honoured": 0,
                                        "broken": 1
                                    },
                                    {
                                        "name": "We pledge to consult stakeholders, in order to develop trustworthy systems.",
                                        "honoured": 1,
                                        "broken": 0
                                    }
                                ]
                            },
                            {
                                "id": 6,
                                "name": "Environmental and societal well-being",
                                "value": "Sustainability",
                                "honoured": 4,
                                "broken": 0,
                                "pledges": [{
                                        "name": "We pledge to consider the environment a stakeholder, in order that our systems are sustainable and ecologically responsible.",
                                        "honoured": 1,
                                        "broken": 0
                                    },
                                    {
                                        "name": "We pledge to scrutinise the system's processes and supply chains, so that it is environmentally friendly.",
                                        "honoured": 1,
                                        "broken": 0
                                    },
                                    {
                                        "name": "We pledge to monitor the system's effect on society, so that we do not damage people's mental or physical wellbeing.",
                                        "honoured": 1,
                                        "broken": 0
                                    },
                                    {
                                        "name": "We pledge to monitor the system's effect on society, so that we do not damage institutions, democracy or society at large.",
                                        "honoured": 1,
                                        "broken": 0
                                    }
                                ]
                            },
                            {
                                "id": 7,
                                "name": "Accountability",
                                "value": "Accountability",
                                "honoured": 3,
                                "broken": 1,
                                "pledges": [{
                                        "name": "We pledge that all decisions will be explainable, so that they can be verified.",
                                        "honoured": 0,
                                        "broken": 1
                                    },
                                    {
                                        "name": "We pledge to make our Responsibility Dashboard public, so that we can be held accountable.",
                                        "honoured": 1,
                                        "broken": 0
                                    },
                                    {
                                        "name": "We pledge to make public our certifications, so that we can be held accountable.",
                                        "honoured": 1,
                                        "broken": 0
                                    },
                                    {
                                        "name": "We pledge to open channels of communication, so that we can be held accountable.",
                                        "honoured": 1,
                                        "broken": 0
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": 3,
                        "source": "Trustworthy AI",
                        "snapshot": "23 Mar 2022",
                        "items": []
                    }
                ]
            )
        )
    }),
    rest.get('snapshots.1.json', async (req, res, ctx) => {
        return res(
            ctx.json(
                [
                    {
                        "id": 1,
                        "source": "Trustworthy AI",
                        "snapshot": "23 Jan 2022",
                        "items": [{
                                "id": 1,
                                "name": "Human agency and oversight",
                                "value": "Responsibility",
                                "honoured": 1,
                                "broken": 2,
                                "pledges": [{
                                        "name": "We pledge to evaluate risk, so that fundamental rights are not negatively affected.",
                                        "honoured": 1,
                                        "broken": 0
                                    },
                                    {
                                        "name": "We pledge to enable human agency, so that users retain autonomy.",
                                        "honoured": 0,
                                        "broken": 1
                                    },
                                    {
                                        "name": "We pledge that there will be human oversight, so that human values are upheld.",
                                        "honoured": 0,
                                        "broken": 1
                                    }
                                ]
                            },
                            {
                                "id": 2,
                                "name": "Technical robustness and safety",
                                "value": "Safety",
                                "honoured": 6,
                                "broken": 1,
                                "pledges": [{
                                        "name": "We pledge that our systems will be safe and secure, so that they cannot be misused by bad actors.",
                                        "honoured": 1,
                                        "broken": 0
                                    },
                                    {
                                        "name": "We pledge that our systems will be robust, so as to minimise risk and prevent harm.",
                                        "honoured": 0,
                                        "broken": 1
                                    },
                                    {
                                        "name": "We pledge that our systems will be resistant to attacks and protected against vulnerabilities, so that our systems and data are safe.",
                                        "honoured": 1,
                                        "broken": 0
                                    },
                                    {
                                        "name": "We pledge to put in place safeguards, so that the system will not be compromised in case of problems.",
                                        "honoured": 1,
                                        "broken": 0
                                    },
                                    {
                                        "name": "We pledge to consider unintended consequences and errors, so that no harm comes to living beings or the environment.",
                                        "honoured": 1,
                                        "broken": 0
                                    },
                                    {
                                        "name": "We pledge to put in place evaluation processes, so that we support, mitigate and correct unintended risks.",
                                        "honoured": 1,
                                        "broken": 0
                                    },
                                    {
                                        "name": "We pledge to demonstrate reproducible results, so that we can accurately describe the system.",
                                        "honoured": 1,
                                        "broken": 0
                                    }
                                ]
                            },
                            {
                                "id": 3,
                                "name": "Privacy and data governance",
                                "value": "Trust",
                                "broken": 2,
                                "honoured": 1,
                                "pledges": [{
                                        "name": "We guarantee privacy and data protection throughout the system’s entire lifecycle, in order to protect users",
                                        "honoured": 0,
                                        "broken": 1
                                    },
                                    {
                                        "name": "We guarantee the integrity of data, in order to enforce biases, inaccuracies, errors and mistakes.",
                                        "honoured": 0,
                                        "broken": 1
                                    },
                                    {
                                        "name": "We pledge to put in place data protocols governing data access, in order to protect individuals' data.",
                                        "honoured": 1,
                                        "broken": 0
                                    }
                                ]
                            },
                            {
                                "id": 4,
                                "name": "Transparency",
                                "value": "Transparency",
                                "broken": 0,
                                "honoured": 3,
                                "features": 1,
                                "pledges": [{
                                        "name": "We pledge to document processes leading to AI decisions, in order to identify reasons in the case of mistakes.",
                                        "honoured": 1,
                                        "broken": 0
                                    },
                                    {
                                        "name": "We pledge to make AI decisions that can be understood and traced by human beings, in order that we can explain those decisions.",
                                        "honoured": 1,
                                        "broken": 0
                                    },
                                    {
                                        "name": "We pledge to make all AI systems identifiable, in order that people can decide whether to accept any interaction.",
                                        "honoured": 1,
                                        "broken": 0
                                    }
                                ]
                            },
                            {
                                "id": 5,
                                "name": "Diversity, non-discrimination and fairness",
                                "value": "Fairness",
                                "broken": 2,
                                "honoured": 2,
                                "pledges": [{
                                        "name": "We pledge to consider and involve all affected stakeholders, to enable diversity and inclusion.",
                                        "honoured": 1,
                                        "broken": 0
                                    },
                                    {
                                        "name": "We pledge to use only data sets that are free of bias and complete, in order not to perpetuate unfairness.",
                                        "honoured": 0,
                                        "broken": 1
                                    },
                                    {
                                        "name": "We pledge to make systems accessible to as wide a range of users as possible, in order that they benefit from equitable access and participation.",
                                        "honoured": 0,
                                        "broken": 1
                                    },
                                    {
                                        "name": "We pledge to consult stakeholders, in order to develop trustworthy systems.",
                                        "honoured": 1,
                                        "broken": 0
                                    }
                                ]
                            },
                            {
                                "id": 6,
                                "name": "Environmental and societal well-being",
                                "value": "Sustainability",
                                "honoured": 4,
                                "broken": 0,
                                "pledges": [{
                                        "name": "We pledge to consider the environment a stakeholder, in order that our systems are sustainable and ecologically responsible.",
                                        "honoured": 1,
                                        "broken": 0
                                    },
                                    {
                                        "name": "We pledge to scrutinise the system's processes and supply chains, so that it is environmentally friendly.",
                                        "honoured": 1,
                                        "broken": 0
                                    },
                                    {
                                        "name": "We pledge to monitor the system's effect on society, so that we do not damage people's mental or physical wellbeing.",
                                        "honoured": 1,
                                        "broken": 0
                                    },
                                    {
                                        "name": "We pledge to monitor the system's effect on society, so that we do not damage institutions, democracy or society at large.",
                                        "honoured": 1,
                                        "broken": 0
                                    }
                                ]
                            },
                            {
                                "id": 7,
                                "name": "Accountability",
                                "value": "Accountability",
                                "honoured": 3,
                                "broken": 1,
                                "pledges": [{
                                        "name": "We pledge that all decisions will be explainable, so that they can be verified.",
                                        "honoured": 0,
                                        "broken": 1
                                    },
                                    {
                                        "name": "We pledge to make our Responsibility Dashboard public, so that we can be held accountable.",
                                        "honoured": 1,
                                        "broken": 0
                                    },
                                    {
                                        "name": "We pledge to make public our certifications, so that we can be held accountable.",
                                        "honoured": 1,
                                        "broken": 0
                                    },
                                    {
                                        "name": "We pledge to open channels of communication, so that we can be held accountable.",
                                        "honoured": 1,
                                        "broken": 0
                                    }
                                ]
                            }
                        ]
                    },
                ]
            )
        )
    }),
    rest.get('snapshots.500.json', async (req, res, ctx) => {
        return res(
            ctx.status(500),
            ctx.json({
              data: `500 error`,
            }),
        )
    }),
    rest.get('snapshots.0.json', async (req, res, ctx) => {
        console.log('handler for 0 snapshot')
        return res(
            ctx.status(200),
            ctx.json({
              data: null,
            }),
        )
    }),
    rest.get('values.json', async (req, res, ctx) => {
        return res(
            ctx.json({
            "source": "Trustworthy AI",
            "items": [
                {
                "name": "Responsibility"
                },
                {
                "name": "Safety"
                },
                {
                "name": "Trust"
                },
                {
                "name": "Transparency"
                },
                {
                "name": "Fairness"
                },
                {
                "name": "Sustainability"
                },
                {
                "name": "Accountability",
                "comments": "Including auditability, minimisation and reporting of negative impact, trade-offs and redress."
                }
            ]
            })
        )
    }),
    rest.get('values.1.json', async (req, res, ctx) => {
        return res(
            ctx.json({
                "id": 1,
                "source": "Trustworthy AI",
                "items": [
                    {
                        "name": "Responsibility",
                        "honoured": 1,
                        "broken": 2,
                        "pledges": [
                            {
                                "name": "We pledge to evaluate risk, so that fundamental rights are not negatively affected.",
                                "honoured": 1,
                                "broken": 0
                            },
                            {
                                "name": "We pledge to enable human agency, so that users retain autonomy.",
                                "honoured": 0,
                                "broken": 1
                            },
                            {
                                "name": "We pledge that there will be human oversight, so that human values are upheld.",
                                "honoured": 0,
                                "broken": 1
                            }
                        ],
                        "features": 3
                    },
                    {
                        "name": "Safety",
                        "honoured": 6,
                        "broken": 1,
                        "pledges": [
                            {
                                "name": "We pledge that our systems will be safe and secure, so that they cannot be misused by bad actors.",
                                "honoured": 1,
                                "broken": 0
                            },
                            {
                                "name": "We pledge that our systems will be robust, so as to minimise risk and prevent harm.",
                                "honoured": 0,
                                "broken": 1
                            },
                            {
                                "name": "We pledge that our systems will be resistant to attacks and protected against vulnerabilities, so that our systems and data are safe.",
                                "honoured": 1,
                                "broken": 0
                            },
                            {
                                "name": "We pledge to put in place safeguards, so that the system will not be compromised in case of problems.",
                                "honoured": 1,
                                "broken": 0
                            },
                            {
                                "name": "We pledge to consider unintended consequences and errors, so that no harm comes to living beings or the environment.",
                                "honoured": 1,
                                "broken": 0
                            },
                            {
                                "name": "We pledge to put in place evaluation processes, so that we support, mitigate and correct unintended risks.",
                                "honoured": 1,
                                "broken": 0
                            },
                            {
                                "name": "We pledge to demonstrate reproducible results, so that we can accurately describe the system.",
                                "honoured": 1,
                                "broken": 0
                            }
                        ],
                        "features": 2
                    },
                    {
                        "name": "Trust",
                        "honoured": 1,
                        "broken": 2,
                        "pledges": [
                            {
                                "name": "We guarantee privacy and data protection throughout the system’s entire lifecycle, in order to protect users",
                                "honoured": 0,
                                "broken": 1
                            },
                            {
                                "name": "We guarantee the integrity of data, in order to enforce biases, inaccuracies, errors and mistakes.",
                                "honoured": 0,
                                "broken": 1
                            },
                            {
                                "name": "We pledge to put in place data protocols governing data access, in order to protect individuals' data.",
                                "honoured": 1,
                                "broken": 0
                            }
                        ],
                        "features": 3
                    },
                    {
                        "name": "Transparency",
                        "honoured": 3,
                        "broken": 0,
                        "pledges": [
                            {
                                "name": "We pledge to document processes leading to AI decisions, in order to identify reasons in the case of mistakes.",
                                "honoured": 1,
                                "broken": 0
                            },
                            {
                                "name": "We pledge to make AI decisions that can be understood and traced by human beings, in order that we can explain those decisions.",
                                "honoured": 1,
                                "broken": 0
                            },
                            {
                                "name": "We pledge to make all AI systems identifiable, in order that people can decide whether to accept any interaction.",
                                "honoured": 1,
                                "broken": 0
                            }
                        ],
                        "features": 4
                    },
                    {
                        "name": "Fairness",
                        "honoured": 2,
                        "broken": 2,
                        "pledges": [
                            {
                                "name": "We pledge to consider and involve all affected stakeholders, to enable diversity and inclusion.",
                                "honoured": 1,
                                "broken": 0
                            },
                            {
                                "name": "We pledge to use only data sets that are free of bias and complete, in order not to perpetuate unfairness.",
                                "honoured": 0,
                                "broken": 1
                            },
                            {
                                "name": "We pledge to make systems accessible to as wide a range of users as possible, in order that they benefit from equitable access and participation.",
                                "honoured": 0,
                                "broken": 1
                            },
                            {
                                "name": "We pledge to consult stakeholders, in order to develop trustworthy systems.",
                                "honoured": 1,
                                "broken": 0
                            }
                        ],
                        "features": 5
                    },
                    {
                        "name": "Sustainability",
                        "honoured": 4,
                        "broken": 0,
                        "pledges": [
                            {
                                "name": "We pledge to consider the environment a stakeholder, in order that our systems are sustainable and ecologically responsible.",
                                "honoured": 1,
                                "broken": 0
                            },
                            {
                                "name": "We pledge to scrutinise the system's processes and supply chains, so that it is environmentally friendly.",
                                "honoured": 1,
                                "broken": 0
                            },
                            {
                                "name": "We pledge to monitor the system's effect on society, so that we do not damage people's mental or physical wellbeing.",
                                "honoured": 1,
                                "broken": 0
                            },
                            {
                                "name": "We pledge to monitor the system's effect on society, so that we do not damage institutions, democracy or society at large.",
                                "honoured": 1,
                                "broken": 0
                            }
                        ],
                        "features": 6
                    },
                    {
                        "name": "Accountability",
                        "comments": "Including auditability, minimisation and reporting of negative impact, trade-offs and redress.",
                        "honoured": 3,
                        "broken": 1,
                        "pledges": [
                            {
                                "name": "We pledge that all decisions will be explainable, so that they can be verified.",
                                "honoured": 0,
                                "broken": 1
                            },
                            {
                                "name": "We pledge to make our Responsibility Dashboard public, so that we can be held accountable.",
                                "honoured": 1,
                                "broken": 0
                            },
                            {
                                "name": "We pledge to make public our certifications, so that we can be held accountable.",
                                "honoured": 1,
                                "broken": 0
                            },
                            {
                                "name": "We pledge to open channels of communication, so that we can be held accountable.",
                                "honoured": 1,
                                "broken": 0
                            }
                        ],
                        "features": 7
                    }
                ]
            })
        )
    }),
    rest.get('values.2.json', async (req, res, ctx) => {
        return res(
            ctx.json({
                "id": 2,
                "source": "Trustworthy AI",
                "items": [
                    {
                        "name": "Responsibility",
                        "honoured": 2,
                        "broken": 1,
                        "pledges": [
                            {
                                "name": "We pledge to evaluate risk, so that fundamental rights are not negatively affected.",
                                "honoured": 1,
                                "broken": 0
                            },
                            {
                                "name": "We pledge to enable human agency, so that users retain autonomy.",
                                "honoured": 1,
                                "broken": 0
                            },
                            {
                                "name": "We pledge that there will be human oversight, so that human values are upheld.",
                                "honoured": 0,
                                "broken": 1
                            }
                        ],
                        "features": 3
                    },
                    {
                        "name": "Safety",
                        "honoured": 6,
                        "broken": 1,
                        "pledges": [
                            {
                                "name": "We pledge that our systems will be safe and secure, so that they cannot be misused by bad actors.",
                                "honoured": 1,
                                "broken": 0
                            },
                            {
                                "name": "We pledge that our systems will be robust, so as to minimise risk and prevent harm.",
                                "honoured": 0,
                                "broken": 1
                            },
                            {
                                "name": "We pledge that our systems will be resistant to attacks and protected against vulnerabilities, so that our systems and data are safe.",
                                "honoured": 1,
                                "broken": 0
                            },
                            {
                                "name": "We pledge to put in place safeguards, so that the system will not be compromised in case of problems.",
                                "honoured": 1,
                                "broken": 0
                            },
                            {
                                "name": "We pledge to consider unintended consequences and errors, so that no harm comes to living beings or the environment.",
                                "honoured": 1,
                                "broken": 0
                            },
                            {
                                "name": "We pledge to put in place evaluation processes, so that we support, mitigate and correct unintended risks.",
                                "honoured": 1,
                                "broken": 0
                            },
                            {
                                "name": "We pledge to demonstrate reproducible results, so that we can accurately describe the system.",
                                "honoured": 1,
                                "broken": 0
                            }
                        ],
                        "features": 2
                    },
                    {
                        "name": "Trust",
                        "honoured": 1,
                        "broken": 2,
                        "pledges": [
                            {
                                "name": "We guarantee privacy and data protection throughout the system’s entire lifecycle, in order to protect users",
                                "honoured": 0,
                                "broken": 1
                            },
                            {
                                "name": "We guarantee the integrity of data, in order to enforce biases, inaccuracies, errors and mistakes.",
                                "honoured": 0,
                                "broken": 1
                            },
                            {
                                "name": "We pledge to put in place data protocols governing data access, in order to protect individuals' data.",
                                "honoured": 1,
                                "broken": 0
                            }
                        ],
                        "features": 3
                    },
                    {
                        "name": "Transparency",
                        "honoured": 3,
                        "broken": 0,
                        "pledges": [
                            {
                                "name": "We pledge to document processes leading to AI decisions, in order to identify reasons in the case of mistakes.",
                                "honoured": 1,
                                "broken": 0
                            },
                            {
                                "name": "We pledge to make AI decisions that can be understood and traced by human beings, in order that we can explain those decisions.",
                                "honoured": 1,
                                "broken": 0
                            },
                            {
                                "name": "We pledge to make all AI systems identifiable, in order that people can decide whether to accept any interaction.",
                                "honoured": 1,
                                "broken": 0
                            }
                        ],
                        "features": 4
                    },
                    {
                        "name": "Fairness",
                        "honoured": 2,
                        "broken": 2,
                        "pledges": [
                            {
                                "name": "We pledge to consider and involve all affected stakeholders, to enable diversity and inclusion.",
                                "honoured": 1,
                                "broken": 0
                            },
                            {
                                "name": "We pledge to use only data sets that are free of bias and complete, in order not to perpetuate unfairness.",
                                "honoured": 0,
                                "broken": 1
                            },
                            {
                                "name": "We pledge to make systems accessible to as wide a range of users as possible, in order that they benefit from equitable access and participation.",
                                "honoured": 0,
                                "broken": 1
                            },
                            {
                                "name": "We pledge to consult stakeholders, in order to develop trustworthy systems.",
                                "honoured": 1,
                                "broken": 0
                            }
                        ],
                        "features": 5
                    },
                    {
                        "name": "Sustainability",
                        "honoured": 4,
                        "broken": 0,
                        "pledges": [
                            {
                                "name": "We pledge to consider the environment a stakeholder, in order that our systems are sustainable and ecologically responsible.",
                                "honoured": 1,
                                "broken": 0
                            },
                            {
                                "name": "We pledge to scrutinise the system's processes and supply chains, so that it is environmentally friendly.",
                                "honoured": 1,
                                "broken": 0
                            },
                            {
                                "name": "We pledge to monitor the system's effect on society, so that we do not damage people's mental or physical wellbeing.",
                                "honoured": 1,
                                "broken": 0
                            },
                            {
                                "name": "We pledge to monitor the system's effect on society, so that we do not damage institutions, democracy or society at large.",
                                "honoured": 1,
                                "broken": 0
                            }
                        ],
                        "features": 6
                    },
                    {
                        "name": "Accountability",
                        "comments": "Including auditability, minimisation and reporting of negative impact, trade-offs and redress.",
                        "honoured": 3,
                        "broken": 1,
                        "pledges": [
                            {
                                "name": "We pledge that all decisions will be explainable, so that they can be verified.",
                                "honoured": 0,
                                "broken": 1
                            },
                            {
                                "name": "We pledge to make our Responsibility Dashboard public, so that we can be held accountable.",
                                "honoured": 1,
                                "broken": 0
                            },
                            {
                                "name": "We pledge to make public our certifications, so that we can be held accountable.",
                                "honoured": 1,
                                "broken": 0
                            },
                            {
                                "name": "We pledge to open channels of communication, so that we can be held accountable.",
                                "honoured": 1,
                                "broken": 0
                            }
                        ],
                        "features": 7
                    }
                ]
            })
        )
    }),
    rest.get('manifest.json', (req, res, ctx) => {
        return res(
            ctx.json({"short_name": "Dashboard"})
        )
    }) 
]