import Light from '@/app/components/svg/light';
import Container from '@/app/components/ui/container';
import { Text } from '@/app/components/ui/Text';
import View from '@/app/components/ui/view';
import HomeLayout from '@/app/core/layout/home-layout';
import { Button } from '@/app/components/ui/button';
import Image from 'next/image';
import { SoapDispenserDroplet, BriefcaseMedical } from 'lucide-react';
import Doctor from '@/app/components/svg/soap';

const HomeContainer = () => {
  return (
    <HomeLayout>
      <Container className="w-full h-full">
        <Container className="flex justify-center items-center">
          <View className="flex justify-around items-center w-full mt-6">
            <Container className="w-full relative z-0" as="section">
              <View className="flex justify-center items-center">
                <div className="w-130 h-130 rounded-full bg-[var(--shapeV1-parent)] z-[-1]" />
                <View className="absolute z-0 translate-y-15">
                  <Image alt="cat" src="/asset/cat.svg" width={500} height={500} />
                </View>
                <View className="flex scale-65 items-center justify-center gap-4 p-6 bg-background rounded-lg absolute bottom-25 right-5 z-2 drop-shadow-2xl  ">
                  <SoapDispenserDroplet className="scale-200 " />
                  <View className="w-full flex-col flex">
                    <Text className="font-bold text-2xl w-1/2 ">Pet Groming</Text>
                    <Text className="w-full max-w-3/4 font-light ">
                      Dapat dipanggil ke rumah atau Datang ke Pet Shop kita
                    </Text>
                  </View>
                </View>
                <View className="flex scale-60 items-center justify-center gap-4 p-6 bg-background rounded-lg absolute bottom-0 -left-5 z-2 drop-shadow-2xl  ">
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
              <View className="absolute scale-30 left-1/3 -top-30 -translate-x-5">
                <Light />
              </View>

              <View className='className="flex justify-center items-center w-2/4'>
                <p className="text-6xl font-extrabold text-[#453bcf]">Be Glowing Be Cute</p>
              </View>
              <View className="flex justify-start items-center w-full max-w-[60%] mt-4">
                <Text className="text-justify">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin mollis sed viverra
                  posuere malesuada. At et pharetra diam vel. Quis dignissim maecenas lectus
                  vestibulum, sed. Risus est accumsan euismod ut at consequat.
                </Text>
              </View>
              <View className="flex justify-start items-center mt-4 w-full max-w-[40%]">
                <Button className="w-full font-bold bg-[var(--shapeV1-parent)]">
                  Pelajari Selengkapnya
                </Button>
              </View>
            </Container>
          </View>
        </Container>
      </Container>
    </HomeLayout>
  );
};

export default HomeContainer;
