import Light from '@/app/components/svg/light';
import Container from '@/app/components/ui/container';
import { Text } from '@/app/components/ui/Text';
import View from '@/app/components/ui/view';
import HomeLayout from '@/app/core/layout/home-layout';
import { Button } from '@/app/components/ui/button';
import Image from 'next/image';
import { SoapDispenserDroplet, BriefcaseMedical } from 'lucide-react';

const HomeContainer = () => {
  return (
    <HomeLayout>
      <Container className="w-full h-full">
        <Container className="flex justify-center items-center">
          <View className="flex flex-col justify-around items-center w-full lg:mt-6 mt-10 lg:flex-row">
            <Container className="w-full relative z-0" as="section">
              <View className="flex justify-center items-center">
                <div className="lg:w-130 lg:h-130  w-90 h-90 rounded-full bg-[var(--shapeV1-parent)] z-[-1] :scale-0" />
                <View className="absolute z-0 translate-y-15">
                  <Image alt="cat" src="/asset/cat.svg" width={500} height={500} />
                </View>
                <View className="flex scale-65 items-center justify-center gap-4 p-6 bg-background rounded-lg absolute lg:bottom-25 lg:right-5 z-2 drop-shadow-2xl translate-x-10 translate-y-13 bottom-18 ">
                  <SoapDispenserDroplet className="scale-200 " />
                  <View className="w-full flex-col flex">
                    <Text className="font-bold text-2xl w-1/2 ">Pet Groming</Text>
                    <Text className="w-full max-w-3/4 font-light ">
                      Dapat dipanggil ke rumah atau Datang ke Pet Shop kita
                    </Text>
                  </View>
                </View>
                <View className="flex scale-60 items-center justify-center gap-4 p-6 bg-background rounded-lg absolute lg:bottom-0 lg:-left-5 z-2 drop-shadow-2xl -bottom-15 right-0 -translate-x-10 translate-y-10 ">
                  <BriefcaseMedical className="scale-200 " />
                  <View className="w-full flex-col flex">
                    <Text className="font-bold text-2xl w-1/2 ">Pet Clinic</Text>
                    <Text className="w-full max-w-3/4 font-light ">
                      Berikan perhatian extra terhadap anabul anda, sebelum semuanya terlambat
                    </Text>
                  </View>
                </View>
              </View>
            </Container>
            <Container as="section" className="relative w-full">
              <View className="flex items-center justify-center flex-col mt-50">
                <View className="absolute lg:scale-30 lg:left-2/3 lg:top-15 lg:-translate-x-10 scale-15 bottom-16 left-33 ">
                  <Light />
                </View>

                <View className='className="flex justify-center items-d lg:w-2/4 w-2/3    '>
                  <p className="text-4xl lg:text-6xl font-extrabold text-[#453bcf]">
                    Be Glowing Be Cute
                  </p>
                </View>
                <View className="flex justify-start items-center w-full lg:max-w-[60%] lg:mt-4 p-4">
                  <Text className="text-justify">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin mollis sed
                    viverra posuere malesuada. At et pharetra diam vel. Quis dignissim maecenas
                    lectus vestibulum, sed. Risus est accumsan euismod ut at consequat.
                  </Text>
                </View>
                <View className="flex justify-start items-center mt-4 w-full max-w-[40%]">
                  <Button className="w-full font-bold bg-[var(--shapeV1-parent)]">
                    Pelajari Selengkapnya
                  </Button>
                </View>
              </View>
            </Container>
          </View>
        </Container>
      </Container>
    </HomeLayout>
  );
};

export default HomeContainer;
