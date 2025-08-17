import Light from '@/app/components/svg/light';
import Container from '@/app/components/ui/container';
import { Text } from '@/app/components/ui/Text';
import View from '@/app/components/ui/view';
import HomeLayout from '@/app/core/layout/home-layout';
import { Button } from '@/app/components/ui/button';
import Image from 'next/image';
import { SoapDispenserDroplet, BriefcaseMedical, Sparkles, Heart, Star } from 'lucide-react';
import Link from 'next/link';

const HomeContainer = () => {
  return (
    <HomeLayout>
      <Container className="w-full h-full min-h-screen bg-gradient-to-br from-background via-card to-muted/20">
        {/* Floating decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 opacity-30 dark:opacity-40">
            <Sparkles className="w-8 h-8 text-primary animate-pulse" />
          </div>
          <div className="absolute top-40 right-20 opacity-30 dark:opacity-40">
            <Heart className="w-6 h-6 text-destructive animate-bounce" />
          </div>
          <div className="absolute bottom-32 left-20 opacity-30 dark:opacity-40">
            <Star className="w-7 h-7 text-warning animate-pulse" />
          </div>
          <div className="absolute top-60 left-1/3 opacity-20 dark:opacity-30">
            <div className="w-4 h-4 bg-primary rounded-full animate-ping" />
          </div>
          <div className="absolute bottom-60 right-1/3 opacity-20 dark:opacity-30">
            <div className="w-3 h-3 bg-secondary rounded-full animate-pulse" />
          </div>
        </div>

        <Container className="flex justify-center items-center relative z-10">
          <View className="flex flex-col justify-around items-center w-full lg:mt-6 mt-10 lg:flex-row gap-8 lg:gap-16">
            {/* Hero Image Section */}
            <Container className="w-full relative z-0 order-2 lg:order-1" as="section">
              <View className="flex justify-center items-center relative">
                {/* Main decorative circle with enhanced gradient */}
                <div className="lg:w-130 lg:h-130 w-90 h-90 rounded-full bg-gradient-to-br from-primary via-primary/80 to-primary/60 shadow-2xl shadow-primary/30 dark:shadow-primary/50 z-[-1] animate-pulse" />

                {/* Additional glow effect */}
                <div className="absolute lg:w-140 lg:h-140 w-100 h-100 rounded-full bg-gradient-to-br from-primary/20 via-transparent to-transparent z-[-2] blur-xl animate-pulse" />

                {/* Cat image with enhanced styling */}
                <View className="absolute z-0 translate-y-15">
                  <div className="relative">
                    <Image
                      alt="cat"
                      src="/asset/cat.svg"
                      width={500}
                      height={500}
                      className="drop-shadow-2xl filter brightness-110 dark:brightness-125 hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </View>

                {/* Pet Grooming Card - Enhanced */}
                <View className="flex scale-65 lg:scale-75 items-center justify-center gap-4 p-6 bg-card/95 backdrop-blur-md border border-border/30 rounded-2xl absolute lg:bottom-25 lg:right-5 z-2 shadow-xl hover:shadow-2xl transition-all duration-500 translate-x-10 translate-y-13 bottom-18 hover:scale-110 hover:bg-card/100 group">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    <SoapDispenserDroplet className="w-8 h-8 text-white" />
                  </div>
                  <View className="w-full flex-col flex">
                    <Text className="font-bold text-xl text-foreground mb-1 group-hover:text-primary transition-colors">
                      Pet Grooming
                    </Text>
                    <Text className="text-sm font-light text-muted-foreground leading-relaxed">
                      Layanan grooming premium untuk hewan kesayangan Anda
                    </Text>
                  </View>
                </View>

                {/* Pet Clinic Card - Enhanced */}
                <View className="flex scale-60 lg:scale-70 items-center justify-center gap-4 p-6 bg-card/95 backdrop-blur-md border border-border/30 rounded-2xl absolute lg:bottom-0 lg:-left-5 z-2 shadow-xl hover:shadow-2xl transition-all duration-500 -bottom-15 right-0 -translate-x-10 translate-y-10 hover:scale-110 hover:bg-card/100 group">
                  <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    <BriefcaseMedical className="w-8 h-8 text-white" />
                  </div>
                  <View className="w-full flex-col flex">
                    <Text className="font-bold text-xl text-foreground mb-1 group-hover:text-primary transition-colors">
                      Pet Clinic
                    </Text>
                    <Text className="text-sm font-light text-muted-foreground leading-relaxed">
                      Perawatan kesehatan terpercaya untuk hewan peliharaan
                    </Text>
                  </View>
                </View>
              </View>
            </Container>

            {/* Content Section */}
            <Container as="section" className="relative w-full order-1 lg:order-2">
              <View className="flex items-center justify-center flex-col lg:mt-20 mt-10">
                {/* Decorative light element */}
                <View className="absolute lg:scale-30 lg:left-2/3 lg:top-15 lg:-translate-x-10 scale-15 bottom-16 left-33 opacity-60 dark:opacity-80">
                  <Light />
                </View>

                {/* Main heading with enhanced styling */}
                <View className="flex justify-center items-center lg:w-3/4 w-full px-4 mb-6">
                  <h1 className="text-4xl lg:text-6xl xl:text-7xl font-extrabold text-center leading-tight">
                    <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 bg-clip-text text-transparent inline-block animate-pulse">
                      Be Glowing
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-foreground via-muted-foreground to-foreground/80 bg-clip-text text-transparent inline-block">
                      Be Cute
                    </span>
                  </h1>
                </View>

                {/* Description with better typography */}
                <View className="flex justify-center items-center w-full lg:max-w-[70%] lg:mt-6 mt-4 px-4">
                  <Text className="text-center lg:text-lg text-base text-muted-foreground leading-relaxed font-medium">
                    Berikan yang terbaik untuk hewan kesayangan Anda dengan layanan pet shop
                    terpercaya. Dari grooming hingga perawatan kesehatan, kami hadir untuk menjaga
                    kebahagiaan dan kesehatan mereka.
                  </Text>
                </View>

                {/* CTA Buttons */}
                <View className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8 w-full max-w-[90%] lg:max-w-[60%]">
                  <Link
                    href={'/login'}
                    className="w-full sm:w-auto px-8 py-3 text-white font-bold bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-xl border-0"
                  >
                    Mulai
                  </Link>
                </View>

                {/* Features highlight */}
                <View className="flex flex-wrap justify-center items-center gap-6 lg:gap-8 mt-12 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2 hover:text-foreground transition-colors">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="font-medium">Tersedia Setiap Hari</span>
                  </div>
                  <div className="flex items-center gap-2 hover:text-foreground transition-colors">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                    <span className="font-medium">Dokter Berpengalaman</span>
                  </div>
                  <div className="flex items-center gap-2 hover:text-foreground transition-colors">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                    <span className="font-medium">Harga Terjangkau</span>
                  </div>
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
