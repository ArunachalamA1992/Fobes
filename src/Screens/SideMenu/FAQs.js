import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  UIManager,
  Platform,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Color from '../../Global/Color';
import {Media} from '../../Global/Media';
import {scr_width} from '../../Utils/Dimensions';
import {useDispatch} from 'react-redux';
import {Iconviewcomponent} from '../../Components/Icontag';
import {Gilmer} from '../../Global/FontFamily';

const FAQs = () => {
  const [height, setHeight] = useState(undefined);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={{uri: Media.faq}}
          style={{
            width: '100%',
            height: 220,
            resizeMode: 'contain',
          }}
        />
        <View style={{width: '100%', paddingHorizontal: 10}}>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <Text
              style={{
                width: '95%',
                fontSize: 18,
                color: Color.black,
                textAlign: 'justify',
                fontFamily: Gilmer.Medium,
                lineHeight: 20,
                letterSpacing: 0.5,
              }}>
              Candidates FAQs
            </Text>
          </View>

          <View style={{width: '95%', marginVertical: 10}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 10,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: '#000',
                  textAlign: 'justify',
                  marginHorizontal: 10,
                  fontFamily: Gilmer.Medium,
                  lineHeight: 20,
                  letterSpacing: 0.5,
                }}>
                1
              </Text>
              <View
                style={{
                  width: 5,
                  height: 5,
                  backgroundColor: '#666',
                  borderRadius: 50,
                }}></View>
              <Text
                style={{
                  fontSize: 16,
                  color: '#000',
                  textAlign: 'justify',
                  marginHorizontal: 10,
                  fontFamily: Gilmer.Medium,
                  lineHeight: 20,
                  letterSpacing: 0.5,
                }}>
                How is Fobes different from other traditional portals?
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                paddingVertical: 10,
                paddingHorizontal: 15,
              }}>
              <Text
                style={{
                  textAlign: 'justify',
                  fontSize: 16,
                  color: '#666',
                  lineHeight: 25,
                  fontFamily: Gilmer.Regular,
                  letterSpacing: 0.5,
                }}>
                Traditional hiring is long, expensive, and inefficient. Fobes
                simplifies the process by connecting employers directly with job
                seekers with relevant skills and experience.
              </Text>
            </View>
          </View>

          <View style={{width: '95%', marginVertical: 10}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 10,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: '#000',
                  textAlign: 'justify',
                  marginHorizontal: 10,
                  fontFamily: Gilmer.Medium,
                  lineHeight: 20,
                  letterSpacing: 0.5,
                }}>
                2
              </Text>
              <View
                style={{
                  width: 5,
                  height: 5,
                  backgroundColor: '#666',
                  borderRadius: 50,
                }}></View>
              <Text
                style={{
                  fontSize: 16,
                  color: '#000',
                  textAlign: 'justify',
                  marginHorizontal: 10,
                  fontFamily: Gilmer.Medium,
                  lineHeight: 20,
                  letterSpacing: 0.5,
                }}>
                How can I get the best company from your portal?
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                paddingVertical: 10,
                paddingHorizontal: 15,
              }}>
              <Text
                style={{
                  textAlign: 'justify',
                  fontSize: 16,
                  color: '#666',
                  lineHeight: 25,
                  fontFamily: Gilmer.Regular,
                  letterSpacing: 0.5,
                }}>
                Fobes has over 5000 active companies across 70+ job categories.
                Our AI algorithm selects the best-fit company for your resume.
              </Text>
            </View>
          </View>

          <View style={{width: '95%', marginVertical: 10}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 10,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: '#000',
                  textAlign: 'justify',
                  marginHorizontal: 10,
                  fontFamily: Gilmer.Medium,
                  lineHeight: 20,
                  letterSpacing: 0.5,
                }}>
                3
              </Text>
              <View
                style={{
                  width: 5,
                  height: 5,
                  backgroundColor: '#666',
                  borderRadius: 50,
                }}></View>
              <Text
                style={{
                  fontSize: 16,
                  color: '#000',
                  textAlign: 'justify',
                  marginHorizontal: 10,
                  fontFamily: Gilmer.Medium,
                  lineHeight: 20,
                  letterSpacing: 0.5,
                }}>
                Do I need to pay to apply to a job or get an Interview call?
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                paddingVertical: 10,
                paddingHorizontal: 15,
              }}>
              <Text
                style={{
                  textAlign: 'justify',
                  fontSize: 16,
                  color: '#666',
                  lineHeight: 25,
                  fontFamily: Gilmer.Regular,
                  letterSpacing: 0.5,
                }}>
                No. You can apply to jobs for FREE on Fobes.
              </Text>
            </View>
          </View>

          <View style={{width: '95%', marginVertical: 10}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 10,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: '#000',
                  textAlign: 'justify',
                  marginHorizontal: 10,
                  fontFamily: Gilmer.Medium,
                  lineHeight: 20,
                  letterSpacing: 0.5,
                }}>
                4
              </Text>
              <View
                style={{
                  width: 5,
                  height: 5,
                  backgroundColor: '#666',
                  borderRadius: 50,
                }}></View>
              <Text
                style={{
                  fontSize: 16,
                  color: '#000',
                  textAlign: 'justify',
                  marginHorizontal: 10,
                  fontFamily: Gilmer.Medium,
                  lineHeight: 20,
                  letterSpacing: 0.5,
                }}>
                Recruiters are asking me to pay to schedule interview for job?
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                paddingVertical: 10,
                paddingHorizontal: 15,
              }}>
              <Text
                style={{
                  textAlign: 'justify',
                  fontSize: 16,
                  color: '#666',
                  lineHeight: 25,
                  fontFamily: Gilmer.Regular,
                  letterSpacing: 0.5,
                }}>
                Note that genuine recruiters do not ask for money to schedule
                interviews or offer a job. If you are receiving such calls or
                emails, beware as this might be a job scam.
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            width: scr_width,
            height: height,
            alignSelf: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
          }}>
          <View
            style={{
              width: '100%',
              marginVertical: 10,
              alignItems: 'center',
            }}>
            <Text
              style={{
                width: '95%',
                fontSize: 18,
                color: 'black',
                fontFamily: Gilmer.Medium,
                lineHeight: 20,
                letterSpacing: 0.5,
                paddingHorizontal: 10,
              }}>
              Recruiters FAQs
            </Text>

            <View style={{width: '100%', marginVertical: 10}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#000',
                    textAlign: 'justify',
                    marginHorizontal: 10,
                    fontFamily: Gilmer.Medium,
                    lineHeight: 20,
                    letterSpacing: 0.5,
                  }}>
                  5
                </Text>
                <View
                  style={{
                    width: 5,
                    height: 5,
                    backgroundColor: '#666',
                    borderRadius: 50,
                  }}></View>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#000',
                    textAlign: 'justify',
                    marginHorizontal: 10,
                    fontFamily: Gilmer.Medium,
                    lineHeight: 20,
                    letterSpacing: 0.5,
                  }}>
                  Why is my job being under a review?
                </Text>
              </View>
              <View
                style={{
                  width: '100%',
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                }}>
                <Text
                  style={{
                    textAlign: 'justify',
                    fontSize: 16,
                    color: '#666',
                    paddingHorizontal: 10,
                    lineHeight: 25,
                    fontFamily: Gilmer.Regular,
                    letterSpacing: 0.5,
                  }}>
                  We promise to endeavor that your job is made active at the
                  earliest. Few job approval decisions can take up to 1 day due
                  to a delay in verifying your account. Until your account KYC
                  gets completed, your jobs will remain under review.
                </Text>
              </View>
            </View>

            <View
              style={{
                width: '100%',
                marginVertical: 10,
                paddingHorizontal: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#000',
                    textAlign: 'justify',
                    marginHorizontal: 10,
                    fontFamily: Gilmer.Medium,
                    lineHeight: 20,
                    letterSpacing: 0.5,
                  }}>
                  6
                </Text>
                <View
                  style={{
                    width: 5,
                    height: 5,
                    backgroundColor: '#666',
                    borderRadius: 50,
                  }}></View>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#000',
                    textAlign: 'justify',
                    marginHorizontal: 10,
                    fontFamily: Gilmer.Medium,
                    lineHeight: 20,
                    letterSpacing: 0.5,
                  }}>
                  Why the documents are required?
                </Text>
              </View>
              <View
                style={{
                  width: '100%',
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                }}>
                <Text
                  style={{
                    textAlign: 'justify',
                    fontSize: 16,
                    color: '#666',
                    lineHeight: 25,
                    fontFamily: Gilmer.Regular,
                    letterSpacing: 0.5,
                  }}>
                  Most job portals do not verify if someone is using your name
                  or your company’s name to list jobs and defraud job seekers.
                  Often times it affects the company’s reputation as an employer
                  in the market. But on Fobes we verify the identity of the
                  recruiter and their association with the company before their
                  job post is active on the platform.{' '}
                </Text>
              </View>
            </View>

            <View
              style={{
                width: '100%',
                marginVertical: 10,
                paddingHorizontal: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#000',
                    textAlign: 'justify',
                    marginHorizontal: 10,
                    fontFamily: Gilmer.Medium,
                    lineHeight: 20,
                    letterSpacing: 0.5,
                  }}>
                  7
                </Text>
                <View
                  style={{
                    width: 5,
                    height: 5,
                    backgroundColor: '#666',
                    borderRadius: 50,
                  }}></View>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#000',
                    textAlign: 'justify',
                    marginHorizontal: 10,
                    fontFamily: Gilmer.Medium,
                    lineHeight: 20,
                    letterSpacing: 0.5,
                  }}>
                  How do I post a job?
                </Text>
              </View>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                }}>
                <View
                  style={{
                    width: 5,
                    height: 5,
                    backgroundColor: '#666',
                    borderRadius: 50,
                  }}></View>
                <Text
                  style={{
                    textAlign: 'justify',
                    fontSize: 16,
                    color: '#666',
                    paddingHorizontal: 10,
                    lineHeight: 25,
                    fontFamily: Gilmer.Regular,
                    letterSpacing: 0.5,
                  }}>
                  To post a job you must be logged in to the employer dashboard
                  with your mobile number.
                </Text>
              </View>

              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                }}>
                <View
                  style={{
                    width: 5,
                    height: 5,
                    backgroundColor: '#666',
                    borderRadius: 50,
                  }}></View>
                <Text
                  style={{
                    textAlign: 'justify',
                    fontSize: 16,
                    color: '#666',
                    paddingHorizontal: 10,
                    lineHeight: 25,
                    fontFamily: Gilmer.Regular,
                    letterSpacing: 0.5,
                  }}>
                  Under "Jobs" Menu, click on Post a Job and fill in the job
                  criteria.
                </Text>
              </View>

              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                }}>
                <View
                  style={{
                    width: 5,
                    height: 5,
                    backgroundColor: '#666',
                    borderRadius: 50,
                  }}></View>
                <Text
                  style={{
                    textAlign: 'justify',
                    fontSize: 16,
                    color: '#666',
                    paddingHorizontal: 10,
                    lineHeight: 25,
                    fontFamily: Gilmer.Regular,
                    letterSpacing: 0.5,
                  }}>
                  On the Job Details page, select your Job role, Department,
                  Category of the job, and type of job.{' '}
                </Text>
              </View>

              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                }}>
                <View
                  style={{
                    width: 5,
                    height: 5,
                    backgroundColor: '#666',
                    borderRadius: 50,
                  }}></View>
                <Text
                  style={{
                    textAlign: 'justify',
                    fontSize: 16,
                    color: '#666',
                    paddingHorizontal: 10,
                    lineHeight: 25,
                    fontFamily: Gilmer.Regular,
                    letterSpacing: 0.5,
                  }}>
                  You can also select the job location, compensation and salary
                  range from this page.
                </Text>
              </View>

              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                }}>
                <View
                  style={{
                    width: 5,
                    height: 5,
                    backgroundColor: '#666',
                    borderRadius: 50,
                  }}></View>
                <Text
                  style={{
                    textAlign: 'justify',
                    fontSize: 16,
                    color: '#666',
                    paddingHorizontal: 10,
                    lineHeight: 25,
                    fontFamily: Gilmer.Regular,
                    letterSpacing: 0.5,
                  }}>
                  On the Candidate Requirements page, select the minimum
                  education level, total experience, the job titles of the
                  candidates and the English level that are required for the
                  job.
                </Text>
              </View>

              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                }}>
                <View
                  style={{
                    width: 5,
                    height: 5,
                    backgroundColor: '#666',
                    borderRadius: 50,
                  }}></View>
                <Text
                  style={{
                    textAlign: 'justify',
                    fontSize: 16,
                    color: '#666',
                    paddingHorizontal: 10,
                    lineHeight: 25,
                    fontFamily: Gilmer.Regular,
                    letterSpacing: 0.5,
                  }}>
                  In Additional Requirements, you can add age, gender, skills,
                  regional language, degree, assets and industry preferences
                  required for the job, if any, and your job description.
                </Text>
              </View>

              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                }}>
                <View
                  style={{
                    width: 5,
                    height: 5,
                    backgroundColor: '#666',
                    borderRadius: 50,
                  }}></View>
                <Text
                  style={{
                    textAlign: 'justify',
                    fontSize: 16,
                    color: '#666',
                    paddingHorizontal: 10,
                    lineHeight: 25,
                    fontFamily: Gilmer.Regular,
                    letterSpacing: 0.5,
                  }}>
                  On the Interviewer information page, select the interviewer
                  details, interview method, and interview address, and select
                  communication preferences on how you want to contact the
                  candidates.
                </Text>
              </View>

              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                }}>
                <View
                  style={{
                    width: 5,
                    height: 5,
                    backgroundColor: '#666',
                    borderRadius: 50,
                  }}></View>
                <Text
                  style={{
                    textAlign: 'justify',
                    fontSize: 16,
                    color: '#666',
                    paddingHorizontal: 10,
                    lineHeight: 25,
                    fontFamily: Gilmer.Regular,
                    letterSpacing: 0.5,
                  }}>
                  Preview your job thoroughly as these are the details
                  applicants will see before applying.
                </Text>
              </View>

              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                }}>
                <View
                  style={{
                    width: 5,
                    height: 5,
                    backgroundColor: '#666',
                    borderRadius: 50,
                  }}></View>
                <Text
                  style={{
                    textAlign: 'justify',
                    fontSize: 16,
                    color: '#666',
                    paddingHorizontal: 10,
                    lineHeight: 25,
                    fontFamily: Gilmer.Regular,
                    letterSpacing: 0.5,
                  }}>
                  Select a plan and Agree to our employer code of conduct and
                  click on Post Job with xxx plans.
                </Text>
              </View>

              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                }}>
                <View
                  style={{
                    width: 5,
                    height: 5,
                    backgroundColor: '#666',
                    borderRadius: 50,
                  }}></View>
                <Text
                  style={{
                    textAlign: 'justify',
                    fontSize: 16,
                    color: '#666',
                    paddingHorizontal: 10,
                    lineHeight: 25,
                    fontFamily: Gilmer.Regular,
                    letterSpacing: 0.5,
                  }}>
                  If you do not have sufficient balance in your employer
                  account, you may be prompted get subscription plans.
                </Text>
              </View>
            </View>

            <View style={{width: '100%', marginVertical: 10}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#000',
                    textAlign: 'justify',
                    marginHorizontal: 10,
                    fontFamily: Gilmer.Medium,
                    lineHeight: 20,
                    letterSpacing: 0.5,
                  }}>
                  8
                </Text>
                <View
                  style={{
                    width: 5,
                    height: 5,
                    backgroundColor: '#666',
                    borderRadius: 50,
                  }}></View>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#000',
                    textAlign: 'justify',
                    marginHorizontal: 10,
                    fontFamily: Gilmer.Medium,
                    lineHeight: 20,
                    letterSpacing: 0.5,
                  }}>
                  How long will it take for my job to go live?
                </Text>
              </View>
              <View
                style={{
                  width: '100%',
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                }}>
                <Text
                  style={{
                    textAlign: 'justify',
                    fontSize: 16,
                    color: '#666',
                    paddingHorizontal: 10,
                    lineHeight: 25,
                    fontFamily: Gilmer.Regular,
                    letterSpacing: 0.5,
                  }}>
                  We assure you that we will make every effort to activate your
                  job as soon as possible. Please note that certain job approval
                  decisions may take up to 1 day due to a delay in verifying
                  your account. Your jobs will remain under review until your
                  account's KYC verification is completed. If your KYC
                  verification is not pending. You can also contact our customer
                  support on WhatsApp ( xxxxxxxxxxxxx ) from 9 am to 6 pm every
                  day.
                </Text>
              </View>
            </View>

            <View style={{width: '100%', marginVertical: 10}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#000',
                    textAlign: 'justify',
                    marginHorizontal: 10,
                    fontFamily: Gilmer.Medium,
                    lineHeight: 20,
                    letterSpacing: 0.5,
                  }}>
                  9
                </Text>
                <View
                  style={{
                    width: 5,
                    height: 5,
                    backgroundColor: '#666',
                    borderRadius: 50,
                  }}></View>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#000',
                    textAlign: 'justify',
                    marginHorizontal: 10,
                    fontFamily: Gilmer.Medium,
                    lineHeight: 20,
                    letterSpacing: 0.5,
                  }}>
                  What is the meaning of unlimited applications?
                </Text>
              </View>
              <View
                style={{
                  width: '100%',
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                }}>
                <Text
                  style={{
                    textAlign: 'justify',
                    fontSize: 16,
                    color: '#666',
                    paddingHorizontal: 10,
                    lineHeight: 25,
                    fontFamily: Gilmer.Regular,
                    letterSpacing: 0.5,
                  }}>
                  Unlimited job applications refer to a feature that allows you
                  to receive an unrestricted number of applications from
                  potential candidates for your job posting. There are no
                  limitations or restrictions placed on the number of
                  applications you can receive. 10. How can I boost my job? What
                  is Smart Boost Via WhatsApp? To boost your job, you can
                  upgrade to the Premium plan and post your job using that plan.
                  Boosting is not available for jobs posted with the Classic
                  plan. By boosting your job, you can enhance its visibility and
                  attract a larger pool of qualified candidates.
                </Text>
              </View>
            </View>

            <View style={{width: '100%', marginVertical: 10}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#000',
                    textAlign: 'justify',
                    marginHorizontal: 10,
                    fontFamily: Gilmer.Medium,
                    lineHeight: 20,
                    letterSpacing: 0.5,
                  }}>
                  10
                </Text>
                <View
                  style={{
                    width: 5,
                    height: 5,
                    backgroundColor: '#666',
                    borderRadius: 50,
                  }}></View>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#000',
                    textAlign: 'justify',
                    marginHorizontal: 10,
                    fontFamily: Gilmer.Medium,
                    lineHeight: 20,
                    letterSpacing: 0.5,
                  }}>
                  What is job branding?
                </Text>
              </View>
              <View
                style={{
                  width: '100%',
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                }}>
                <Text
                  style={{
                    textAlign: 'justify',
                    fontSize: 16,
                    color: '#666',
                    paddingHorizontal: 10,
                    lineHeight: 25,
                    fontFamily: Gilmer.Regular,
                    letterSpacing: 0.5,
                  }}>
                  Job branding refers to the process of creating a unique and
                  compelling image for a particular job. It involves positioning
                  the job in a way that sets it apart from similar roles and
                  attracts qualified candidates.
                </Text>
              </View>
            </View>

            <View style={{width: '100%', marginVertical: 10}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#000',
                    textAlign: 'justify',
                    marginHorizontal: 10,
                    fontFamily: Gilmer.Medium,
                    lineHeight: 20,
                    letterSpacing: 0.5,
                  }}>
                  11
                </Text>
                <View
                  style={{
                    width: 5,
                    height: 5,
                    backgroundColor: '#666',
                    borderRadius: 50,
                  }}></View>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#000',
                    textAlign: 'justify',
                    marginHorizontal: 10,
                    fontFamily: Gilmer.Medium,
                    lineHeight: 20,
                    letterSpacing: 0.5,
                  }}>
                  How can I contact Fobes customer care?
                </Text>
              </View>
              <View
                style={{
                  width: '100%',
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                }}>
                <Text
                  style={{
                    textAlign: 'justify',
                    fontSize: 16,
                    color: '#666',
                    paddingHorizontal: 10,
                    lineHeight: 25,
                    fontFamily: Gilmer.Regular,
                    letterSpacing: 0.5,
                  }}>
                  Call or WhatsApp: 9385245210,9385245296.
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              width: '100%',
              marginVertical: 10,
              paddingHorizontal: 10,
              alignItems: 'center',
            }}>
            <Text
              style={{
                width: '95%',
                fontSize: 18,
                color: 'black',
                fontFamily: 'Gilmer-SemiBold',
              }}>
              Contact Us
            </Text>
            <Text
              style={{
                width: '95%',
                textAlign: 'justify',
                fontSize: 16,
                color: '#666',
                paddingTop: 10,
                fontFamily: Gilmer.Regular,
                lineHeight: 20,
                letterSpacing: 0.5,
              }}>
              For any other queries and feedback can reach us with below address{' '}
            </Text>

            <TouchableOpacity
              style={{
                width: '95%',
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 20,
              }}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 50,
                  borderColor: Color.primary,
                  borderWidth: 1,
                }}>
                <Iconviewcomponent
                  Icontag={'Feather'}
                  iconname={'phone-call'}
                  icon_size={22}
                  iconstyle={{color: Color.primary}}
                />
              </View>
              <Text
                style={{
                  fontSize: 18,
                  color: 'black',
                  paddingHorizontal: 10,
                  fontFamily: Gilmer.Medium,
                  lineHeight: 20,
                  letterSpacing: 0.5,
                }}>
                +91 994-330-0100
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                width: '95%',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 50,
                  borderColor: Color.primary,
                  borderWidth: 1,
                }}>
                <Iconviewcomponent
                  Icontag={'Ionicons'}
                  iconname={'mail'}
                  icon_size={22}
                  iconstyle={{color: Color.primary}}
                />
              </View>
              <Text
                style={{
                  width: '95%',
                  fontSize: 18,
                  color: 'black',
                  paddingHorizontal: 10,
                  fontFamily: Gilmer.Medium,
                  lineHeight: 20,
                  letterSpacing: 0.5,
                }}>
                admin@fobes.in
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              width: '95%',
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 30,
              marginBottom: 50,
            }}>
            <View
              style={{
                flex: 0.5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('../../assets/logos/fobes.png')}
                style={{width: '80%', height: 50, resizeMode: 'contain'}}
              />
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 10,
              }}>
              <Text
                style={{
                  textAlign: 'justify',
                  fontSize: 18,
                  color: Color.primary,
                  fontFamily: Gilmer.Medium,
                  lineHeight: 20,
                  letterSpacing: 0.5,
                }}>
                Fobes Skill Itech Private Limited
              </Text>
              <Text
                style={{
                  textAlign: 'justify',
                  fontSize: 14,
                  color: '#666',
                  fontFamily: Gilmer.Regular,
                  lineHeight: 20,
                  letterSpacing: 0.5,
                }}>
                You are hired! Get yourself registered. The top companies in the
                league are hiring now.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  NumberBoxConatiner: {
    width: '88%',
    borderColor: Color.grey,
    borderWidth: 1,
    paddingStart: 10,
    height: 50,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderRadius: 5,
  },
  incomeBoxConatiner: {
    width: '88%',
    borderColor: Color.grey,
    borderWidth: 1,
    paddingStart: 10,
    height: 50,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderRadius: 5,
  },
  numberTextBox: {
    width: '100%',
    height: 50,
    color: Color.black,
    fontSize: 16,
    fontFamily: 'Gilmer-Regular',
  },
  invalidLogin: {
    width: '90%',
    fontSize: 13,
    marginHorizontal: 10,
    fontFamily: 'Gilmer-SemiBold',
    color: Color.red,
  },
});

export default FAQs;
