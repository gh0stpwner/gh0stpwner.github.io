import { Button } from 'components/Button';
import { DecoderText } from 'components/DecoderText';
import { Divider } from 'components/Divider';
import { Footer } from 'components/Footer';
import { Heading } from 'components/Heading';
import { Icon } from 'components/Icon';
import { Meta } from 'components/Meta';
import { Section } from 'components/Section';
import { Text } from 'components/Text';
import { tokens } from 'components/ThemeProvider/theme';
import { Transition } from 'components/Transition';
import { useRef , useState } from 'react';
import { cssProps, msToNum, numToMs } from 'utils/style';
import styles from './Contact.module.css';
import Script from "next/script";
import { randomBytes } from 'crypto';
const nonce = randomBytes(128).toString('base64');

export const Contact = () => {
  const errorRef = useRef();
  const [sending] = useState(false);
  const [complete] = useState(false);
  const [statusError] = useState('');
  const initDelay = tokens.base.durationS;
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_KEY;
  console.log(GA_MEASUREMENT_ID);

  return (
    <Section className={styles.contact}>
      <Meta
        title="Contact"
        description="Send me a message if you’re interested in discussing a Service or if you just want to say hi"
      ></Meta>
<Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
        nonce={nonce}
      />
      <Script id="google-analytics" strategy="afterInteractive" nonce={nonce}>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
      <Transition unmount in={!complete} timeout={1600}>
        {(visible, status) => (
          <form className={styles.form}>
            <Heading
              className={styles.title}
              data-status={status}
              level={3}
              as="h1"
              style={getDelay(tokens.base.durationXS, initDelay, 0.3)}
            >
              <DecoderText text="Worried about cyber threats targeting your business?" start={status !== 'exited'} delay={300} />
            </Heading>
            <Divider
              className={styles.divider}
              data-status={status}
              style={getDelay(tokens.base.durationXS, initDelay, 0.4)}
            />
              <div><Text> In today&apos;s interconnected world, cybersecurity is more important than ever and i can help you assess your current security posture, identify vulnerabilities, and implement effective security measures to protect 
                your business from cyberattacks. Whether you&apos;re a small business or a large enterprise, let me help you by sharing the knowledge and finding the right solutions to you.</Text>
                </div>
            <Transition in={statusError} timeout={msToNum(tokens.base.durationM)}>
              {errorStatus => (
                <div
                  className={styles.formError}
                  data-status={errorStatus}
                  style={cssProps({
                    height: errorStatus ? errorRef.current?.offsetHeight : 0,
                  })}
                >
                  <div className={styles.formErrorContent} ref={errorRef}>
                    <div className={styles.formErrorMessage}>
                      <Icon className={styles.formErrorIcon} icon="error" />
                      {statusError}
                    </div>
                  </div>
                </div>
              )}
            </Transition>
            <Button
              secondary
              className={styles.button}
              data-status={status}
              data-sending={sending}
              href="mailto:pwnerghost@gmail.com"
              icon="send"
            >
              E-mail
            </Button> 
              <Text/>
            <Button
              secondary
              className={styles.button}
              data-status={status}
              data-sending={sending}
              href="https://discordapp.com/users/295566675766411267"
              icon="send"
            >
              Discord  
            </Button>
          </form>
        )}
      </Transition>
      <Footer className={styles.footer} />
    </Section>
  );
};

function getDelay(delayMs, offset = numToMs(0), multiplier = 1) {
  const numDelay = msToNum(delayMs) * multiplier;
  return cssProps({ delay: numToMs((msToNum(offset) + numDelay).toFixed(0)) });
}
